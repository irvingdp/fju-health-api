//TODO: localization this file.
let currentLanguage = "zh-tw";
const _packageData = {
    "zh-tw": [
        {
            group: 3,
            title: "精準健檢",
            content: [
                {
                    title: "糞便檢查",
                    items: [
                        {name: "免疫法糞便檢查", enable: true},
                        {name: "幽門螺旋桿菌檢測(糞便)", enable: true}
                    ]
                },
                {
                    title: "尿液檢查",
                    items: [
                        {name: "尿沉渣顯微鏡檢查", enable: true},
                        {name: "尿一般檢查", enable: true},
                        {name: "尿微白蛋白(Microalbumin)", enable: false}
                    ]
                },
                {
                    title: "血液檢查",
                    items: [
                        {name: "全血球計數", enable: true},
                        {name: "白血球分類", enable: true}
                    ]
                },
                {
                    title: "血糖",
                    items: [
                        {name: "血糖,飯前", enable: true},
                        {name: "醣化血紅素", enable: true},
                    ]
                },
                {
                    title: "肝膽胰功能",
                    items: [
                        {name: "胰臟澱粉酶(Amylase)", enable: true},
                        {name: "麩胺酸草醋酸轉氨基酶(AST)", enable: true},
                        {name: "麩胺酸草丙酸轉氨酶( ALT)", enable: true},
                        {name: "鹼性磷酸酶(ALP)", enable: true},
                        {name: "總膽紅素(T-Bil)", enable: true},
                        {name: "直接膽紅素(D-Bil)", enable: true},
                        {name: "白蛋白", enable: true},
                        {name: "球蛋白", enable: true},
                        {name: "全蛋白(Total portin)", enable: true},
                        {name: "丙型麩胺酸轉移酶(γ-GT)膽道酵素", enable: true},
                    ]
                },
                {
                    title: "血脂肪",
                    items: [
                        {name: "總膽固醇", enable: true},
                        {name: "三酸甘油脂", enable: true},
                        {name: "高密度脂蛋白-膽固醇", enable: true},
                        {name: "低密度脂蛋白", enable: true},
                    ]
                },
                {
                    title: "腎功能",
                    items: [
                        {name: "尿素氮(BUN)", enable: true},
                        {name: "肌酸酐(Creatinine)", enable: true},
                        {name: "尿酸(Uric acid) ", enable: true},
                    ]
                },
                {
                    title: "肌肉酵素",
                    items: [
                        {name: "乳酸脫氫脢(LDH)", enable: true},
                        {name: "肌酸磷化脢(CPK)", enable: true},
                        {name: "肌酸磷酸酶(CK-MB)", enable: true},
                    ]
                },
                {
                    title: "電解質",
                    items: [
                        {name: "鈉(Na)", enable: true},
                        {name: "鉀(K)", enable: true},
                        {name: "氯(CL)", enable: true},
                    ]
                },
                {
                    title: "甲狀腺功能",
                    items: [
                        {name: "甲狀腺刺激素免疫分析 TSH", enable: true},
                        {name: "游離甲狀腺素免疫分析 Free T4", enable: true},
                    ]
                },
                {
                    title: "血清學檢查",
                    items: [
                        {name: "B型肝炎表面抗原 HBsAg", enable: true},
                        {name: "B型肝炎表面抗體 Anti HBs", enable: true},
                        {name: "C型肝炎病毒抗體檢查", enable: true},
                        {name: "高敏感度C-反應蛋白(HS-CRP)", enable: true},
                    ]
                },
                {
                    title: "腫瘤標記",
                    items: [
                        {name: "甲種胎兒蛋白檢查 AFP α-fetoprotein ", enable: true},
                        {name: "癌胚胎抗原 CEA", enable: true},
                        {name: "攝護腺特異抗原 PSA(男)", enable: true},
                        {name: "游離型攝護腺特異性抗原(free PSA)(男)", enable: false},
                        {name: "CA-199腫瘤標記 CA-199", enable: true},
                        {name: "CA-125腫瘤標記 CA-125(女)", enable: true},
                        {name: "CA-153腫瘤標記 CA-153(女)", enable: true},
                    ]
                },
                {
                    title: "賀爾蒙(男)",
                    items: [
                        {name: "睪丸脂醇免疫分析（Testosterone", enable: false},
                        {name: "性荷爾蒙結合球蛋白", enable: false},
                    ]
                },
                {
                    title: "癌基因檢測",
                    items: [
                        {name: "多方位癌症熱點基因檢測", enable: false},
                    ]
                },
                {
                    title: "心電圖",
                    items: [
                        {name: "靜態心電圖", enable: true},
                    ]
                },
                {
                    title: "肺功能檢查",
                    items: [
                        {name: "流量容積圖形檢查(肺功能)", enable: true},
                    ]
                },
                {
                    title: "身體理學檢查",
                    items: [
                        {name: "健檢內科診察", enable: true},
                        {name: "健檢報告彙診", enable: true},
                        {name: "健檢諮詢門診", enable: true},
                        {name: "身體組成分析", enable: true},
                        {name: "身高、體重、上肢血壓測定、ABI", enable: true},
                    ]
                },
                {
                    title: "泌尿科檢查(男)",
                    items: [
                        {name: "尿流速", enable: true},
                        {name: "泌尿科會診", enable: true},
                    ]
                },
                {
                    title: "乳房外科檢查(女)",
                    items: [
                        {name: "乳房外科會診", enable: true},
                    ]
                },
                {
                    title: "婦產科檢查(女)",
                    items: [
                        {name: "婦產科會診", enable: true},
                        {name: "新柏式子宮頸抹片檢查", enable: true},
                        {name: "子宮頸人類乳突病毒篩檢", enable: false},
                    ]
                },
                {
                    title: "眼科檢查",
                    items: [
                        {name: "眼科會診", enable: true},
                        {name: "氣壓式眼壓測定", enable: true},
                        {name: "細隙燈顯微鏡檢查", enable: true},
                        {name: "眼底檢查", enable: true},
                        {name: "視力檢查", enable: true},
                        {name: "角膜曲度測定(電腦驗光)", enable: true},
                        {name: "視神經攝影檢查", enable: false},
                    ]
                },
                {
                    title: "耳鼻喉科檢查",
                    items: [
                        {name: "耳鼻喉會診", enable: true},
                        {name: "聽力檢查", enable: true},
                        {name: "鼻咽內視鏡", enable: false},
                    ]
                },
                {
                    title: "超音波檢查",
                    items: [
                        {name: "腹部超音波", enable: true},
                        {name: "甲狀腺超音波", enable: false},
                        {name: "乳房超音波(女)", enable: true},
                        {name: "婦科超音波(女)", enable: false},
                        {name: "經直腸攝護腺超音波(男)", enable: false},
                    ]
                },
                {
                    title: "核磁共振",
                    items: [
                        {name: "腹部及骨盆腔核磁共振影像檢查", enable: false},
                        {name: "腦部核磁共振及腦血管影像檢查", enable: false},
                        {name: "全身核磁共振之脊椎核磁共振影像", enable: false},
                        {name: "乳房核磁共振(女)", enable: false},
                        {name: "低幅射線胸部電腦斷層", enable: false},
                        {name: "骨質密度檢查", enable: false},
                    ]
                },
                {
                    title: "X光",
                    items: [
                        {name: "左側胸部X光", enable: true},
                        {name: "胸腔X光檢查(PA VIEW)", enable: true},
                        {name: "脊椎X光檢查", enable: true},
                    ]
                },
                {
                    title: "內視鏡檢查",
                    items: [
                        {name: "上消化道泛內視鏡檢查", enable: true},
                        {name: "大腸鏡檢查", enable: true},
                        {name: "一日低渣代餐包", enable: true},
                    ]
                },
                {
                    title: "麻醉部",
                    items: [
                        {name: "無痛內視鏡", enable: true},
                    ]
                },
            ]
        },
        {
            group: 2,
            title: "防癌健檢",
            content: [
                {
                    title: "糞便檢查",
                    items: [
                        {name: "免疫法糞便檢查", enable: true},
                        {name: "幽門螺旋桿菌檢測(糞便)", enable: true}
                    ]
                },
                {
                    title: "尿液檢查",
                    items: [
                        {name: "尿沉渣顯微鏡檢查", enable: true},
                        {name: "尿一般檢查", enable: true},
                        {name: "尿微白蛋白(Microalbumin)", enable: true}
                    ]
                },
                {
                    title: "血液檢查",
                    items: [
                        {name: "全血球計數", enable: true},
                        {name: "白血球分類", enable: true}
                    ]
                },
                {
                    title: "血糖",
                    items: [
                        {name: "血糖,飯前", enable: true},
                        {name: "醣化血紅素", enable: true},
                    ]
                },
                {
                    title: "肝膽胰功能",
                    items: [
                        {name: "胰臟澱粉酶(Amylase)", enable: true},
                        {name: "麩胺酸草醋酸轉氨基酶(AST)", enable: true},
                        {name: "麩胺酸草丙酸轉氨酶( ALT)", enable: true},
                        {name: "鹼性磷酸酶(ALP)", enable: true},
                        {name: "總膽紅素(T-Bil)", enable: true},
                        {name: "直接膽紅素(D-Bil)", enable: true},
                        {name: "白蛋白", enable: true},
                        {name: "球蛋白", enable: true},
                        {name: "全蛋白(Total portin)", enable: true},
                        {name: "丙型麩胺酸轉移酶(γ-GT)膽道酵素", enable: true},
                    ]
                },
                {
                    title: "血脂肪",
                    items: [
                        {name: "總膽固醇", enable: true},
                        {name: "三酸甘油脂", enable: true},
                        {name: "高密度脂蛋白-膽固醇", enable: true},
                        {name: "低密度脂蛋白", enable: true},
                    ]
                },
                {
                    title: "腎功能",
                    items: [
                        {name: "尿素氮(BUN)", enable: true},
                        {name: "肌酸酐(Creatinine)", enable: true},
                        {name: "尿酸(Uric acid) ", enable: true},
                    ]
                },
                {
                    title: "肌肉酵素",
                    items: [
                        {name: "乳酸脫氫脢(LDH)", enable: true},
                        {name: "肌酸磷化脢(CPK)", enable: true},
                        {name: "肌酸磷酸酶(CK-MB)", enable: true},
                    ]
                },
                {
                    title: "電解質",
                    items: [
                        {name: "鈉(Na)", enable: true},
                        {name: "鉀(K)", enable: true},
                        {name: "氯(CL)", enable: true},
                    ]
                },
                {
                    title: "甲狀腺功能",
                    items: [
                        {name: "甲狀腺刺激素免疫分析 TSH", enable: true},
                        {name: "游離甲狀腺素免疫分析 Free T4", enable: true},
                    ]
                },
                {
                    title: "血清學檢查",
                    items: [
                        {name: "B型肝炎表面抗原 HBsAg", enable: true},
                        {name: "B型肝炎表面抗體 Anti HBs", enable: true},
                        {name: "C型肝炎病毒抗體檢查", enable: true},
                        {name: "高敏感度C-反應蛋白(HS-CRP)", enable: true},
                    ]
                },
                {
                    title: "腫瘤標記",
                    items: [
                        {name: "甲種胎兒蛋白檢查 AFP α-fetoprotein ", enable: true},
                        {name: "癌胚胎抗原 CEA", enable: true},
                        {name: "攝護腺特異抗原 PSA(男)", enable: true},
                        {name: "游離型攝護腺特異性抗原(free PSA)(男)", enable: true},
                        {name: "CA-199腫瘤標記 CA-199", enable: true},
                        {name: "CA-125腫瘤標記 CA-125(女)", enable: true},
                        {name: "CA-153腫瘤標記 CA-153(女)", enable: true},
                    ]
                },
                {
                    title: "賀爾蒙(男)",
                    items: [
                        {name: "睪丸脂醇免疫分析（Testosterone", enable: true},
                        {name: "性荷爾蒙結合球蛋白", enable: true},
                    ]
                },
                {
                    title: "癌基因檢測",
                    items: [
                        {name: "多方位癌症熱點基因檢測", enable: false},
                    ]
                },
                {
                    title: "心電圖",
                    items: [
                        {name: "靜態心電圖", enable: true},
                    ]
                },
                {
                    title: "肺功能檢查",
                    items: [
                        {name: "流量容積圖形檢查(肺功能)", enable: true},
                    ]
                },
                {
                    title: "身體理學檢查",
                    items: [
                        {name: "健檢內科診察", enable: true},
                        {name: "健檢報告彙診", enable: true},
                        {name: "健檢諮詢門診", enable: true},
                        {name: "身體組成分析", enable: true},
                        {name: "身高、體重、上肢血壓測定、ABI", enable: true},
                    ]
                },
                {
                    title: "泌尿科檢查(男)",
                    items: [
                        {name: "尿流速", enable: true},
                        {name: "泌尿科會診", enable: true},
                    ]
                },
                {
                    title: "乳房外科檢查(女)",
                    items: [
                        {name: "乳房外科會診", enable: true},
                    ]
                },
                {
                    title: "婦產科檢查(女)",
                    items: [
                        {name: "婦產科會診", enable: true},
                        {name: "新柏式子宮頸抹片檢查", enable: true},
                        {name: "子宮頸人類乳突病毒篩檢", enable: true},
                    ]
                },
                {
                    title: "眼科檢查",
                    items: [
                        {name: "眼科會診", enable: true},
                        {name: "氣壓式眼壓測定", enable: true},
                        {name: "細隙燈顯微鏡檢查", enable: true},
                        {name: "眼底檢查", enable: true},
                        {name: "視力檢查", enable: true},
                        {name: "角膜曲度測定(電腦驗光)", enable: true},
                        {name: "視神經攝影檢查", enable: true},
                    ]
                },
                {
                    title: "耳鼻喉科檢查",
                    items: [
                        {name: "耳鼻喉會診", enable: true},
                        {name: "聽力檢查", enable: true},
                        {name: "鼻咽內視鏡", enable: true},
                    ]
                },
                {
                    title: "超音波檢查",
                    items: [
                        {name: "腹部超音波", enable: true},
                        {name: "甲狀腺超音波", enable: true},
                        {name: "乳房超音波(女)", enable: true},
                        {name: "婦科超音波(女)", enable: true},
                        {name: "經直腸攝護腺超音波(男)", enable: true},
                    ]
                },
                {
                    title: "核磁共振",
                    items: [
                        {name: "腹部及骨盆腔核磁共振影像檢查", enable: true},
                        {name: "腦部核磁共振及腦血管影像檢查", enable: true},
                        {name: "全身核磁共振之脊椎核磁共振影像", enable: true},
                        {name: "乳房核磁共振(女)", enable: true},
                        {name: "低幅射線胸部電腦斷層", enable: true},
                        {name: "骨質密度檢查", enable: true},
                    ]
                },
                {
                    title: "內視鏡檢查",
                    items: [
                        {name: "上消化道泛內視鏡檢查", enable: true},
                        {name: "大腸鏡檢查", enable: true},
                        {name: "一日低渣代餐包", enable: true},
                    ]
                },
                {
                    title: "麻醉部",
                    items: [
                        {name: "無痛內視鏡", enable: true},
                    ]
                },
            ]
        },
        {
            group: 1,
            title: "菁英防癌健檢",
            content: [
                {
                    title: "糞便檢查",
                    items: [
                        {name: "免疫法糞便檢查", enable: true},
                        {name: "幽門螺旋桿菌檢測(糞便)", enable: true}
                    ]
                },
                {
                    title: "尿液檢查",
                    items: [
                        {name: "尿沉渣顯微鏡檢查", enable: true},
                        {name: "尿一般檢查", enable: true},
                        {name: "尿微白蛋白(Microalbumin)", enable: true}
                    ]
                },
                {
                    title: "血液檢查",
                    items: [
                        {name: "全血球計數", enable: true},
                        {name: "白血球分類", enable: true}
                    ]
                },
                {
                    title: "血糖",
                    items: [
                        {name: "血糖,飯前", enable: true},
                        {name: "醣化血紅素", enable: true},
                    ]
                },
                {
                    title: "肝膽胰功能",
                    items: [
                        {name: "胰臟澱粉酶(Amylase)", enable: true},
                        {name: "麩胺酸草醋酸轉氨基酶(AST)", enable: true},
                        {name: "麩胺酸草丙酸轉氨酶( ALT)", enable: true},
                        {name: "鹼性磷酸酶(ALP)", enable: true},
                        {name: "總膽紅素(T-Bil)", enable: true},
                        {name: "直接膽紅素(D-Bil)", enable: true},
                        {name: "白蛋白", enable: true},
                        {name: "球蛋白", enable: true},
                        {name: "全蛋白(Total portin)", enable: true},
                        {name: "丙型麩胺酸轉移酶(γ-GT)膽道酵素", enable: true},
                    ]
                },
                {
                    title: "血脂肪",
                    items: [
                        {name: "總膽固醇", enable: true},
                        {name: "三酸甘油脂", enable: true},
                        {name: "高密度脂蛋白-膽固醇", enable: true},
                        {name: "低密度脂蛋白", enable: true},
                    ]
                },
                {
                    title: "腎功能",
                    items: [
                        {name: "尿素氮(BUN)", enable: true},
                        {name: "肌酸酐(Creatinine)", enable: true},
                        {name: "尿酸(Uric acid) ", enable: true},
                    ]
                },
                {
                    title: "肌肉酵素",
                    items: [
                        {name: "乳酸脫氫脢(LDH)", enable: true},
                        {name: "肌酸磷化脢(CPK)", enable: true},
                        {name: "肌酸磷酸酶(CK-MB)", enable: true},
                    ]
                },
                {
                    title: "電解質",
                    items: [
                        {name: "鈉(Na)", enable: true},
                        {name: "鉀(K)", enable: true},
                        {name: "氯(CL)", enable: true},
                    ]
                },
                {
                    title: "甲狀腺功能",
                    items: [
                        {name: "甲狀腺刺激素免疫分析 TSH", enable: true},
                        {name: "游離甲狀腺素免疫分析 Free T4", enable: true},
                    ]
                },
                {
                    title: "血清學檢查",
                    items: [
                        {name: "B型肝炎表面抗原 HBsAg", enable: true},
                        {name: "B型肝炎表面抗體 Anti HBs", enable: true},
                        {name: "C型肝炎病毒抗體檢查", enable: true},
                        {name: "高敏感度C-反應蛋白(HS-CRP)", enable: true},
                    ]
                },
                {
                    title: "腫瘤標記",
                    items: [
                        {name: "甲種胎兒蛋白檢查 AFP α-fetoprotein ", enable: true},
                        {name: "癌胚胎抗原 CEA", enable: true},
                        {name: "攝護腺特異抗原 PSA(男)", enable: true},
                        {name: "游離型攝護腺特異性抗原(free PSA)(男)", enable: true},
                        {name: "CA-199腫瘤標記 CA-199", enable: true},
                        {name: "CA-125腫瘤標記 CA-125(女)", enable: true},
                        {name: "CA-153腫瘤標記 CA-153(女)", enable: true},
                    ]
                },
                {
                    title: "賀爾蒙(男)",
                    items: [
                        {name: "睪丸脂醇免疫分析（Testosterone", enable: true},
                        {name: "性荷爾蒙結合球蛋白", enable: true},
                    ]
                },
                {
                    title: "癌基因檢測",
                    items: [
                        {name: "多方位癌症熱點基因檢測", enable: true},
                    ]
                },
                {
                    title: "心電圖",
                    items: [
                        {name: "靜態心電圖", enable: true},
                    ]
                },
                {
                    title: "肺功能檢查",
                    items: [
                        {name: "流量容積圖形檢查(肺功能)", enable: true},
                    ]
                },
                {
                    title: "身體理學檢查",
                    items: [
                        {name: "健檢內科診察", enable: true},
                        {name: "健檢報告彙診", enable: true},
                        {name: "健檢諮詢門診", enable: true},
                        {name: "身體組成分析", enable: true},
                        {name: "身高、體重、上肢血壓測定、ABI", enable: true},
                    ]
                },
                {
                    title: "泌尿科檢查(男)",
                    items: [
                        {name: "尿流速", enable: true},
                        {name: "泌尿科會診", enable: true},
                    ]
                },
                {
                    title: "乳房外科檢查(女)",
                    items: [
                        {name: "乳房外科會診", enable: true},
                    ]
                },
                {
                    title: "婦產科檢查(女)",
                    items: [
                        {name: "婦產科會診", enable: true},
                        {name: "新柏式子宮頸抹片檢查", enable: true},
                        {name: "子宮頸人類乳突病毒篩檢", enable: true},
                    ]
                },
                {
                    title: "眼科檢查",
                    items: [
                        {name: "眼科會診", enable: true},
                        {name: "氣壓式眼壓測定", enable: true},
                        {name: "細隙燈顯微鏡檢查", enable: true},
                        {name: "眼底檢查", enable: true},
                        {name: "視力檢查", enable: true},
                        {name: "角膜曲度測定(電腦驗光)", enable: true},
                        {name: "視神經攝影檢查", enable: true},
                    ]
                },
                {
                    title: "耳鼻喉科檢查",
                    items: [
                        {name: "耳鼻喉會診", enable: true},
                        {name: "聽力檢查", enable: true},
                        {name: "鼻咽內視鏡", enable: true},
                    ]
                },
                {
                    title: "超音波檢查",
                    items: [
                        {name: "腹部超音波", enable: true},
                        {name: "甲狀腺超音波", enable: true},
                        {name: "乳房超音波(女)", enable: true},
                        {name: "婦科超音波(女)", enable: true},
                        {name: "經直腸攝護腺超音波(男)", enable: true},
                    ]
                },
                {
                    title: "核磁共振",
                    items: [
                        {name: "腹部及骨盆腔核磁共振影像檢查", enable: true},
                        {name: "腦部核磁共振及腦血管影像檢查", enable: true},
                        {name: "全身核磁共振之脊椎核磁共振影像", enable: true},
                        {name: "乳房核磁共振(女)", enable: true},
                        {name: "低幅射線胸部電腦斷層", enable: true},
                        {name: "骨質密度檢查", enable: true},
                    ]
                },
                {
                    title: "內視鏡檢查",
                    items: [
                        {name: "上消化道泛內視鏡檢查", enable: true},
                        {name: "大腸鏡檢查", enable: true},
                        {name: "一日低渣代餐包", enable: true},
                    ]
                },
                {
                    title: "麻醉部",
                    items: [
                        {name: "無痛內視鏡", enable: true},
                    ]
                },
            ]
        },
    ]
}
module.exports = _packageData[currentLanguage];


