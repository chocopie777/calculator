const nums = document.querySelectorAll('.num');
const clear = document.getElementById('AC');
const plus = document.getElementById('+');
const minus = document.getElementById('-');
const multiply = document.getElementById('*');
const divide = document.getElementById('/');
const done = document.getElementById('=');
const display_result = document.getElementById('result-display');
const display_expression = document.getElementById('expression-display');
let isZero = true;
let expression_text = '';
let current_num = '';
let result_num = 0;
let last_sign = '';

nums.forEach((item) => {
    item.addEventListener('click', (event) => {
        if (isZero) {
            display_result.innerText = '';
            isZero = false;
        }
        current_num += `${item.innerText}`;
        display_result.innerText = current_num;
    })
});

clear.addEventListener('click', (event) => {
    display_result.innerText = '0';
    expression_text = '';
    display_expression.innerText = expression_text;
    current_num = '';
    result_num = 0;
    isZero = true;
});

done.addEventListener('click', (event) => {
    if (last_sign !== '') {
        calculation(last_sign);
        expression_text = parseFloat(result_num);
        display_expression.innerText = expression_text;
        display_result.innerText = result_num;
        last_sign = '';
        current_num = '';
    }
});

plus.addEventListener('click', (event) => {
    if (last_sign === '') {
        if (current_num !== '') {
            result_num += parseFloat(current_num);
        }
    } else {
        if (current_num !== '') {
            calculation(last_sign);
        } else {
            return
        }
    }
    last_sign = '+';
    expression_text += current_num;
    expression_text += '+';
    display_expression.innerText = expression_text;
    display_result.innerText = result_num;
    current_num = '';
});

minus.addEventListener('click', (event) => {
    if (last_sign === '') {
        if (current_num !== '') {
            result_num += parseFloat(current_num);
        }
    } else {
        if (current_num !== '') {
            calculation(last_sign);
        } else {
            return
        }
    }
    last_sign = '-';
    expression_text += current_num;
    expression_text += '-';
    display_expression.innerText = expression_text;
    display_result.innerText = result_num;
    current_num = '';
});

multiply.addEventListener('click', (event) => {
    if (last_sign === '') {
        if (current_num !== '') {
            result_num += parseFloat(current_num);
        }
    } else {
        if (current_num !== '') {
            calculation(last_sign);
        } else {
            return
        }
    }
    last_sign = '*';
    expression_text += current_num;
    expression_text += '*';
    display_expression.innerText = expression_text;
    display_result.innerText = result_num;
    current_num = '';
});

divide.addEventListener('click', (event) => {
    if (last_sign === '') {
        if (current_num !== '') {
            result_num += parseFloat(current_num);
        }
    } else {
        if (current_num !== '') {
            calculation(last_sign);
        } else {
            return
        }
    }
    last_sign = '/';
    expression_text += current_num;
    expression_text += '/';
    display_expression.innerText = expression_text;
    display_result.innerText = result_num;
    current_num = '';
});

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
            result_num = result_num / parseFloat(current_num);
            break;
    }
}