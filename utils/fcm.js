const fcm_url = "https://gcm-http.googleapis.com/gcm/send";
const api_key = "AAAA3ChS3oE:APA91bFdF6q_6cQeWk9kt8JvPfSbF3BFFlT4z60AZ4ZMe_LnuNr5I_4JVFnz2XQvOulyeNDvErCj1nLTDKi38b2asGAytkE9OmNnF1A_eWgqBrcoEq3srSkZ8A3bPAPJ7RRqBbfuaqXf";
//TODO: move to build-resources
const fetch = require('node-fetch');

const fcm = {
    push: ({registration_token, body, title}) => {
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + api_key,
            },
            body: JSON.stringify({
                "to" : registration_token,
                "notification" : {
                    "body" : body,
                    "title" : title,
                    //"icon" : "myicon"
                }
            })
        }
        return new Promise(function (resolve, reject) {
            fetch(fcm_url,options).then((response) => {
                response.json().then(result => {
                    if (response.status === 200) {
                        result.success === 1 ? resolve(true) : reject(result)
                    } else {
                        reject(result)
                    }
                }).catch(err => {
                    reject(err)
                })

            });
        })

        /*
         * sample response
         *
         * {
             "multicast_id": 6167290803272870292,
             "success": 1,
             "failure": 0,
             "canonical_ids": 0,
             "results": [
                 {
                 "message_id": "0:1503935023216701%974f8881974f8881"
                 }
         ]}
         * */
    }
};
module.exports = fcm;
