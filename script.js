document.addEventListener("DOMContentLoaded", function () {
    const uploadInput = document.getElementById("upload");
    const originalImage = document.getElementById("original-image");
    const compressedImage = document.getElementById("compressed-image");
    const downloadBtn = document.getElementById("download-btn");

    uploadInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                originalImage.src = e.target.result;
                compressImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    function compressImage(src) {
        const img = new Image();
        img.src = src;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const maxWidth = 300; 
            const scaleSize = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleSize;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const compressedSrc = canvas.toDataURL("image/jpeg", 0.6);
            compressedImage.src = compressedSrc;

            downloadBtn.onclick = function () {
                const link = document.createElement("a");
                link.href = compressedSrc;
                link.download = "compressed-image.jpg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        };
    }
});