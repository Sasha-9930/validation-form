// 1. Знаходимо всі елементи форми
const form = document.getElementById('registrationForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
const submitBtn = document.getElementById('submitBtn');

// 2. Функція для відображення успіху/помилки (рамки та текст)
function setStatus(inputElement, errorElement, isValid, message) {
    if (isValid) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        errorElement.textContent = '';
    } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        errorElement.textContent = message;
    }
}

// 3. Проста валідація Імені та Прізвища
function validateName(inputElement, errorElement) {
    const value = inputElement.value.trim();
    
    if (value === "") {
        setStatus(inputElement, errorElement, false, "Поле обов'язкове для заповнення.");
        return false;
    }

    // Перевіряємо першу літеру (має бути великою)
    const firstChar = value.charAt(0);
    if (firstChar !== firstChar.toUpperCase() || firstChar === firstChar.toLowerCase()) {
        setStatus(inputElement, errorElement, false, "Має починатися з великої літери.");
        return false;
    }

    // Перевіряємо, чи немає цифр або заборонених знаків
    const lettersOnly = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ']+$/;
    if (!lettersOnly.test(value)) {
        setStatus(inputElement, errorElement, false, "Допускаються лише українські чи англійські літери.");
        return false;
    }

    setStatus(inputElement, errorElement, true);
    return true;
}

// 4. Проста валідація Пошти
function validateEmail() {
    const value = email.value.trim();
    const errorElement = document.getElementById('emailError');
    
    if (value === "") {
        setStatus(email, errorElement, false, "Поле обов'язкове для заповнення.");
        return false;
    }
    
    // Перевірка на наявність "@" та крапки після неї
    if (value.indexOf('@') === -1 || value.indexOf('.') === -1 || value.lastIndexOf('.') < value.indexOf('@')) {
        setStatus(email, errorElement, false, "Невірний формат e-mail.");
        return false;
    }

    setStatus(email, errorElement, true);
    return true;
}

// 5. Валідація Пароля по кожній умові окремо
function validatePassword() {
    const value = password.value;
    const errorElement = document.getElementById('passwordError');

    if (value === "") {
        setStatus(password, errorElement, false, "Поле обов'язкове для заповнення.");
        return false;
    }
    if (value.length < 8) {
        setStatus(password, errorElement, false, "Пароль має бути мінімум 8 символів.");
        return false;
    }

    // Перевірка на велику літеру
    let hasUpper = false;
    for (let i = 0; i < value.length; i++) {
        if (value[i] >= 'A' && value[i] <= 'Z' || 'А' <= value[i] && value[i] <= 'Я' || value[i] === 'І' || value[i] === 'Ї' || value[i] === 'Є') {
            hasUpper = true;
            break;
        }
    }
    if (!hasUpper) {
        setStatus(password, errorElement, false, "Пароль має містити хоча б одну велику літеру.");
        return false;
    }

    // Перевірка на маленьку літеру
    let hasLower = false;
    for (let i = 0; i < value.length; i++) {
        if (value[i] >= 'a' && value[i] <= 'z' || 'а' <= value[i] && value[i] <= 'я' || value[i] === 'і' || value[i] === 'ї' || value[i] === 'є') {
            hasLower = true;
            break;
        }
    }
    if (!hasLower) {
        setStatus(password, errorElement, false, "Пароль має містити хоча б одну маленьку літеру.");
        return false;
    }

    // Перевірка на цифру
    let hasDigit = false;
    for (let i = 0; i < value.length; i++) {
        if (value[i] >= '0' && value[i] <= '9') {
            hasDigit = true;
            break;
        }
    }
    if (!hasDigit) {
        setStatus(password, errorElement, false, "Пароль має містити хоча б одну цифру.");
        return false;
    }

    // Перевірка на спеціальний символ
    const specialChars = "!@#$%^&*()_+=-[]{}|;:',.<>?`~";
    let hasSpecial = false;
    for (let i = 0; i < value.length; i++) {
        if (specialChars.includes(value[i])) {
            hasSpecial = true;
            break;
        }
    }
    if (!hasSpecial) {
        setStatus(password, errorElement, false, "Пароль має містити хоча б один спецсимвол (!@#$%^&*).");
        return false;
    }

    setStatus(password, errorElement, true);
    return true;
}

// 6. Перевірка стану всієї форми для активації кнопки
function checkFormValidity() {
    const isFirstNameValid = validateName(firstName, document.getElementById('firstNameError'));
    const isLastNameValid = validateName(lastName, document.getElementById('lastNameError'));
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// 7. Події введення (Жива валідація)
firstName.addEventListener('input', () => {
    validateName(firstName, document.getElementById('firstNameError'));
    checkFormValidity();
});

lastName.addEventListener('input', () => {
    validateName(lastName, document.getElementById('lastNameError'));
    checkFormValidity();
});

email.addEventListener('input', () => {
    validateEmail();
    checkFormValidity();
});

password.addEventListener('input', () => {
    validatePassword();
    checkFormValidity();
});

// 8. Сховати/показати пароль за чекбоксом
showPasswordCheckbox.addEventListener('change', function() {
    password.type = this.checked ? 'text' : 'password';
});

// 9. Відправка форми
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняємо перезавантаження
    
    console.log("Дані успішно відправлені:", {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    });
    
    alert("Реєстрація успішна! Вітаємо!");
});