const nums = document.querySelectorAll('.num');
const clear = document.getElementById('AC');
const plus = document.getElementById('+');
const minus = document.getElementById('-');
const multiply = document.getElementById('*');
const divide = document.getElementById('/');
const done = document.getElementById('=');
const reverse = document.getElementById('+/-');
const percent = document.getElementById('%');
const display_result = document.querySelector('.calculator__result-display span');
const display_expression = document.getElementById('expression-display');
let isZero = true;
let expression_text = '';
let current_num = '';
let result_num = 0;
let last_sign = '';
let divide_by_zero = true;

nums.forEach((item) => {
    item.addEventListener('click', (event) => {
        if (item.innerText === '.') {
            if (current_num === '') {
                current_num += '0' + `${item.innerText}`;
            } else {
                if (!current_num.includes('.')) {
                    current_num += `${item.innerText}`;
                }
            }
        } else {
            if (isZero) {
                display_result.innerText = '';
                isZero = false;
            }
            current_num += `${item.innerText}`;
        }
        display_result.innerText = current_num;
    })
});

clear.addEventListener('click', (event) => {
    clear_display();
});

done.addEventListener('click', (event) => {
    if (last_sign !== '') {
        if (current_num !== '') {
            calculation(last_sign);
            if (divide_by_zero) {
                expression_text = parseFloat(result_num);
                display_expression.innerText = '';
                display_result.innerText = result_num;
                last_sign = '';
                current_num = '';
            } else {
                divide_by_zero = true;
            }
        }
    }
});
reverse.addEventListener('click', (event) => {
    if (current_num !== '') {
        if (parseFloat(current_num) > 0) {
            current_num = '-' + current_num;
        } else {
            current_num = current_num.slice(1);
        }
        display_result.innerText = current_num;
    } else {
        result_num = -result_num;
        display_result.innerText = result_num;
    }
});

percent.addEventListener('click', (event) => {
    if (result_num !== 0 && current_num !== '') {
        let per_result;
        if (last_sign === '*' || last_sign === '/') {
            per_result = parseFloat(current_num) / 100;
        } else {
            per_result = (result_num * parseFloat(current_num)) / 100;
        }
        current_num = '' + per_result;
        display_result.innerText = current_num;
    }
});

plus.addEventListener('click', (event) => {
    if (!calculation_algorithm('+')) {
        if (divide_by_zero) {
            last_sign = '+';
            result_formation();
        } else {
            divide_by_zero = true;
        }
    }
});

minus.addEventListener('click', (event) => {
    if (!calculation_algorithm('-')) {
        if (divide_by_zero) {
            last_sign = '-';
            result_formation();
        } else {
            divide_by_zero = true;
        }
    }
});

multiply.addEventListener('click', (event) => {
    if (!calculation_algorithm('*')) {
        if (divide_by_zero) {
            last_sign = '*';
            result_formation();
        } else {
            divide_by_zero = true;
        }
    }
});

divide.addEventListener('click', (event) => {
    if (!calculation_algorithm('/')) {
        if (divide_by_zero) {
            last_sign = '/';
            result_formation();
        } else {
            divide_by_zero = true;
        }
    }
});

function result_formation() {
    expression_text += current_num;
    expression_text += last_sign;
    display_expression.innerText = expression_text;
    display_result.innerText = result_num;
    current_num = '';
}

function calculation_algorithm(new_sign) {
    if (last_sign === '') {
        if (result_num === 0) {
            if (current_num !== '') {
                result_num += parseFloat(current_num);
            }
        } else {
            if (current_num !== '') {
                result_num = 0;
                result_num += parseFloat(current_num);
                expression_text = '';
            }
        }
    } else {
        if (current_num !== '') {
            calculation(last_sign);
        } else {
            const last_char = expression_text.slice(expression_text.length - 1,
                expression_text.length);

            if (last_char === '+' || last_char === '-' || last_char === '*'
                || last_char === '/') {
                last_sign = new_sign;
                expression_text = expression_text.slice(0, expression_text.length - 1) + last_sign;
                display_expression.innerText = expression_text;
            }
            return true;
        }
    }
    return false;
}

function calculation(sign) {
    switch (sign) {
        case '+':
            result_num = result_num + parseFloat(current_num);
            break;
        case '-':
            result_num = result_num - parseFloat(current_num);
            break;
        case '*':
            result_num = result_num * parseFloat(current_num);
            break;
        case '/':
            if (parseFloat(current_num) !== 0) {
                result_num = result_num / parseFloat(current_num);
            } else {
                divide_by_zero = false;
                clear_display('ошибка: деление на ноль!');
            }
            break;
    }
}

function clear_display(text = '') {
    display_result.innerText = '0';
    expression_text = '';
    display_expression.innerText = text;
    last_sign = '';
    current_num = '';
    result_num = 0;
    isZero = true;
}