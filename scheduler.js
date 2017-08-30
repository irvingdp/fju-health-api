"use strict";
const config = require("./config");

// initialize Knex
const Model = require('objection').Model;
const Knex = require('knex');
const knexConfig = require('./gen/knex/knexfile');
let knex = Knex(knexConfig.development);
Model.knex(knex);

const schedule = require('node-schedule');
const moment = require("moment")
const Enums = require("./enums");
const fcm = require('./utils/fcm')
const reminderManager = require('./utils/reminderManager')
const DomainReservation = require('./domain/reservation');
const DomainReminder = require('./domain/reminder');

var domainReservation = new DomainReservation();
var domainReminder = new DomainReminder();

const _getNeedNotificationReminders = ({keys}) => {
    return new Promise(function (resolve, reject) {
        let result = [];
        domainReservation.getPaidReservation().then(paidReservations => {
            (paidReservations || []).forEach(paidReservation => {
                (paidReservation.reminder || []).forEach(reminder => {
                    let reminderNotifyDate = reminderManager.getNotifyDate(reminder.key, paidReservation.reserveDate);
                    //find the special key and today's not yet sent reminders
                    if (!reminder.isSent &&
                        keys.indexOf(reminder.key) > -1 &&
                        moment().utc().diff(reminderNotifyDate, 'days') === 0
                    ) {
                        result.push(reminder);
                    }
                })
            });
            resolve(result);
        })
    })
};

const _push = (reminders) => {
    (reminders || []).forEach(reminder => {
        fcm.push({
            registration_token: "cETvNBcZCeM:APA91bHwuQyFxCFKHnK-RGASxLzcyWtksSSI5eG7YpbuKzfyJONZp09fWhHxm3ycHj29MXKQ_RwcYk7lUtkYsSscCpbG9SO01vvDnu1GtI8OcbxvrRzNtCJP-5SoPdJ98-dPHvhbsns9",
            //TODO: get registration_token from modal(db) ,reminder.token
            body: reminder.description,
            title: reminder.title
        }).then(result => {
            if (result) {
                return domainReminder.setIsSent({reminderModel: reminder, isSent: true})
            }
            console.log(result);
        })
    })
}

var threeAmScheduler, eightAmScheduler;

const scheduler = {
    startAll: () => {
        threeAmScheduler = schedule.scheduleJob('0 0 3 * * *', function () {
            _getNeedNotificationReminders({keys: [Enums.reminderKeys.CATHARTIC]}).then(reminders => {
                _push(reminders)
            }).catch(err => {
                console.log(err);
            })
        });
        console.log('start am 3:00 push reminder scheduler');
        eightAmScheduler = schedule.scheduleJob('0 0 8 * * *', function () {
            _getNeedNotificationReminders({
                keys: [
                    Enums.reminderKeys.LOW_RESIDUE_DIET_1,
                    Enums.reminderKeys.LOW_RESIDUE_DIET_2,
                    Enums.reminderKeys.LOW_RESIDUE_DIET_3,
                    Enums.reminderKeys.SPECIMEN_COLLECTION
                ],
            }).then(reminders => {
                _push(reminders)
            }).catch(err => {
                console.log(err);
            })
        });
        console.log('start am 8:00 push reminder scheduler');
    },
    cancelAll: () => {
        threeAmScheduler && threeAmScheduler.cancel();
        eightAmScheduler && eightAmScheduler.cancel();
    },
}

module.exports = scheduler;

