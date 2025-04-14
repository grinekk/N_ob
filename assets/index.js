document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector(".selector_box");
    if (selector) {
        selector.classList.add("selector_close"); // Set to closed state but visible
        selector.style.maxHeight = "45px"; // Ensure max-height is set for closed state
    }

    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.style.opacity = '0';
    });

    const errorElements = document.querySelectorAll('.error_shown');
    errorElements.forEach(element => {
        element.classList.remove('error_shown');
    });
});

const selector = document.querySelector(".selector_box");
if (selector) {
    // Open or close the selector on hover or click
    selector.addEventListener('mouseenter', () => {
        selector.classList.add("selector_open");
        selector.classList.remove("selector_close");
    });

    selector.addEventListener('mouseleave', () => {
        if (!selector.classList.contains("clicked")) {
            selector.classList.add("selector_close");
            selector.classList.remove("selector_open");
        }
    });

    selector.addEventListener('click', () => {
        if (selector.classList.contains("selector_open")) {
            selector.classList.add("clicked");
        } else {
            selector.classList.remove("clicked");
            selector.classList.add("selector_open");
            selector.classList.remove("selector_close");
        }
    });
}

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

document.querySelectorAll('.date_input').forEach(input => {
    input.addEventListener('input', function () {
        // Sprawdź, czy pole to rok (id="year")
        if (this.id === 'year') {
            // Ogranicz długość do 4 cyfr
            if (this.value.length > 4) {
                this.value = this.value.slice(0, 4);
            }
        } else {
            // Ogranicz długość do 2 cyfr dla dnia i miesiąca
            if (this.value.length > 2) {
                this.value = this.value.slice(0, 2);
            }
        }
    });

    input.addEventListener('blur', function () {
        // Dodaj '0' tylko dla dnia i miesiąca, jeśli długość wynosi 1
        if (this.id !== 'year' && this.value.length === 1 && this.value > 0) {
            this.value = this.value.padStart(2, '0');
        }
    });
});

let sex = "m"; // Default gender

const genderSelect = document.querySelector("#gender");
if (genderSelect) {
    genderSelect.addEventListener("change", () => {
        sex = genderSelect.value; // Update the selected gender
    });
}

function toggleGenderSelector() {
    const selector = document.querySelector("#genderSelector");
    if (selector) {
        if (selector.classList.contains("selector_open")) {
            selector.classList.remove("selector_open");
            selector.classList.add("selector_close");
        } else {
            selector.classList.remove("selector_close");
            selector.classList.add("selector_open");
        }
    }
}

function selectGender(text, id) {
    const selectedText = document.querySelector(".selected_text");
    if (selectedText) {
        selectedText.innerHTML = text;
    }
    const selector = document.querySelector("#genderSelector");
    if (selector) {
        selector.classList.remove("selector_open");
        selector.classList.add("selector_close");
    }
    sex = id;
}

// Close the gender selector when clicking outside
document.addEventListener("click", (event) => {
    const selector = document.querySelector("#genderSelector");
    if (selector && !selector.contains(event.target) && selector.classList.contains("selector_open")) {
        selector.classList.remove("selector_open");
        selector.classList.add("selector_close");
    }
});

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        selectGender(option.innerHTML, option.id);
    });
});

const upload = document.querySelector(".upload");

const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {
    const input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    });
});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', () => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");

    upload.removeAttribute("selected");

    const file = imageInput.files[0];
    const data = new FormData();
    data.append("image", file);

    fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            'Authorization': 'Client-ID 295027f296bc174'
        },
        body: data
    })
    .then(result => result.json())
    .then(response => {
        const url = response.data.link;
        upload.classList.remove("error_shown");
        upload.setAttribute("selected", url);
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");

        const uploadedImage = upload.querySelector(".upload_uploaded");
        if (uploadedImage) {
            uploadedImage.src = url; // Set the uploaded image URL
            uploadedImage.style.display = "block"; // Ensure the image is visible
        }
    });
});

document.querySelector(".go").addEventListener('click', () => {
    const empty = [];
    const params = new URLSearchParams();

    params.set("sex", sex); // Use the selected gender
    if (!upload.hasAttribute("selected")) {
        empty.push(upload);
        upload.classList.add("error_shown");
    } else {
        params.set("image", upload.getAttribute("selected"));
    }

    let birthday = "";
    let dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday += "." + element.value;
        if (isEmpty(element.value)) {
            dateEmpty = true;
        }
    });

    birthday = birthday.substring(1);

    if (dateEmpty) {
        const dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("birthday", birthday);
    }

    document.querySelectorAll(".input_holder").forEach((element) => {
        const input = element.querySelector(".input");

        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value);
        }
    });

    if (empty.length !== 0) {
        empty[0].scrollIntoView();
    } else {
        forwardToId(params);
    }
});

function isEmpty(value) {
    const pattern = /^\s*$/;
    return pattern.test(value);
}

function forwardToId(params) {
    location.href = "id.html?" + params;
}

const guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {
    if (guide.classList.contains("unfolded")) {
        guide.classList.remove("unfolded");
    } else {
        guide.classList.add("unfolded");
    }
});

function resetForm() {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('error_shown');
    });

    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.style.opacity = '0';
    });

    const errorElements = document.querySelectorAll('.error_shown');
    errorElements.forEach(element => {
        element.classList.remove('error_shown');
    });

    const upload = document.querySelector('.upload');
    if (upload) {
        upload.classList.remove("error_shown");
    }

    const dateField = document.querySelector('.date');
    if (dateField) {
        dateField.classList.remove("error_shown");
    }
}