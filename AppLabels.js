//TODO: get local form header
let currentLanguage = "zh-tw";

const _appLabels = {
    "zh-tw": {
        LOW_RESIDUE_DIET_1: {
            title: "低渣飲食",
            description: "請開始進行低渣飲食。",
        },
        LOW_RESIDUE_DIET_2: {
            title: "低渣飲食",
            description: "請進行低渣飲食。",
        },
        LOW_RESIDUE_DIET_3: {
            title: "低渣飲食",
            description: "今日飲食請使用代餐包。",
        },
        SPECIMEN_COLLECTION: {
            title: "檢體採集",
            description: "請於今日採集檢體。",
        },
        CATHARTIC: {
            title: "健檢當日提醒",
            description: "請於凌晨 3:00 服用清腸藥物。",
        },
    },
    "en-us": {

    }
}
module.exports = _appLabels[currentLanguage];