
document.addEventListener("DOMContentLoaded", function () {
            var modal = document.getElementById("videoModal");
            var video = document.getElementById("introVideo");

            // Show the modal when the page loads
            modal.style.display = "block";

            // Pause the video when the modal is closed
            modal.addEventListener("click", function () {
                modal.style.display = "none";
                video.pause();
            });
        });
