const nums = document.querySelectorAll('.num');
const clear = document.getElementById('AC');
const plus = document.getElementById('+');
const minus = document.getElementById('-');
const multiply = document.getElementById('*');
const divide = document.getElementById('/');
const done = document.getElementById('=');
const reverse = document.getElementById('+/-');
const percent = document.getElementById('%');
const display_result = document.getElementById('result-display');
const display_expression = document.getElementById('expression-display');
let isZero = true;
let expression_text = '';
let current_num = '';
let result_num = 0;
let last_sign = '';

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
    display_result.innerText = '0';
    expression_text = '';
    display_expression.innerText = '';
    last_sign = '';
    current_num = '';
    result_num = 0;
    isZero = true;
});

done.addEventListener('click', (event) => {
    if (last_sign !== '') {
        if (current_num !== '') {
            calculation(last_sign);
            expression_text = parseFloat(result_num);
            display_expression.innerText = '';
            display_result.innerText = result_num;
            last_sign = '';
            current_num = '';
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
        console.log(result_num);
    }
});

percent.addEventListener('click', (event) => {
    if (result_num !== 0) {
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
    if (last_sign === '') {
        if (current_num !== '') {
            result_num += parseFloat(current_num);
        }
    } else {
        if (current_num !== '') {
            calculation(last_sign);
        } else {
            const last_char = expression_text.slice(expression_text.length - 1,
                expression_text.length);

            if (last_char === '+' || last_char === '-' || last_char === '*'
                || last_char === '/') {
                expression_text = expression_text.slice(0, expression_text.length - 1) + '+';
                display_expression.innerText = expression_text;
                last_sign = '+';
            }
            return
        }
    }
    last_sign = '+';
    result_formation();
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
            const last_char = expression_text.slice(expression_text.length - 1,
                expression_text.length);

            if (last_char === '+' || last_char === '-' || last_char === '*'
                || last_char === '/') {
                expression_text = expression_text.slice(0, expression_text.length - 1) + '-';
                display_expression.innerText = expression_text;
                last_sign = '-';
            }
            return;
        }
    }
    last_sign = '-';
    result_formation();
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
            const last_char = expression_text.slice(expression_text.length - 1,
                expression_text.length);

            if (last_char === '+' || last_char === '-' || last_char === '*'
                || last_char === '/') {
                expression_text = expression_text.slice(0, expression_text.length - 1) + '*';
                display_expression.innerText = expression_text;
                last_sign = '*';
            }
            return
        }
    }
    last_sign = '*';
    result_formation();
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
            const last_char = expression_text.slice(expression_text.length - 1,
                expression_text.length);

            if (last_char === '+' || last_char === '-' || last_char === '*'
                || last_char === '/') {
                expression_text = expression_text.slice(0, expression_text.length - 1) + '/';
                display_expression.innerText = expression_text;
                last_sign = '/';
            }
            return
        }
    }
    last_sign = '/';
    result_formation();
});

function result_formation() {
    expression_text += current_num;
    expression_text += last_sign;
    display_expression.innerText = expression_text;
    display_result.innerText = result_num;
    current_num = '';
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
            result_num = result_num / parseFloat(current_num);
            break;
    }
}