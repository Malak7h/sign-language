let video;
let handpose;
let predictions = [];

function setup() {
    // إعداد canvas داخل صفحة HTML
    createCanvas(320, 240);  

    // فتح الكاميرا
    video = createCapture(VIDEO);  
    video.size(320, 240);  // تعيين حجم الفيديو
    video.hide();  // إخفاء الفيديو لأننا سنعرضه على الـ canvas

    // تحميل نموذج Handpose
    handpose = ml5.handpose(video, modelLoaded);

    // استماع لنتائج التنبؤات من النموذج
    handpose.on("predict", results => {
        predictions = results;
    });
}

function modelLoaded() {
    console.log("تم تحميل نموذج Handpose بنجاح!");
}

function draw() {
    // عرض الفيديو على الـ canvas
    image(video, 0, 0);

    // إذا تم الكشف عن يد، نقوم برسم النقاط على اليد
    if (predictions.length > 0) {
        for (let i = 0; i < predictions.length; i++) {
            let hand = predictions[i];

            // رسم النقاط التي تمثل معالم اليد
            for (let j = 0; j < hand.landmarks.length; j++) {
                let x = hand.landmarks[j][0];
                let y = hand.landmarks[j][1];
                fill(0, 255, 0);  // تحديد اللون الأخضر
                noStroke();
                ellipse(x, y, 10, 10);  // رسم دائرة عند كل معلم
            }
        }
    }
}

// إخفاء محتوى الصفحة الأولي عند الضغط على الزر
document.getElementById('start-button').addEventListener('click', function () {
    // إخفاء محتوى الصفحة الأولي
    document.getElementById('intro-content').style.display = 'none';
    
    // إظهار الكاميرا
    document.getElementById('camera-container').style.display = 'block';
    
    // تشغيل الكاميرا
    setup();
});