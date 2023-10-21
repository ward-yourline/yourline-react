function uploadImageFromForm(form) {
    const formData = new FormData(form)
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "http://yourline-images.duckdns.org:81/upload");

        xhr.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 100;
                console.log(`Upload progress: ${progress.toFixed(2)}%`);
            }
        });

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.response)
                    const response = xhr.responseText
                    const url = "http://yourline-images.duckdns.org:81/image/" + response;
                    resolve(url);
                } else {
                    reject(new Error("Upload failed"));
                }
            }
        };

        xhr.send(formData);
    });
}
