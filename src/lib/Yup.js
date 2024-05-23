import * as Yup from 'yup';

const NOT_EMPTY_ERROR_MESSAGE = "This field shouldn't be only spaces";

function emailLength() {
  return this.test('emailLength', 'Email is invalid', function (value) {
    return value
      ? value.substring(value.lastIndexOf('.') + 1).length < 64
      : false;
  });
}

function notEmpty(message) {
  return this.test('notEmpty', message, function (value) {
    const { path, createError } = this;

    if (!value || typeof value !== 'string') return true;

    const testValue = value.trim();
    if (testValue.length === 0) {
      return createError({ path, message: message ?? NOT_EMPTY_ERROR_MESSAGE });
    }

    return true;
  });
}

Yup.setLocale({
  mixed: {
    required: (field) => `${field.path} is required`,
  },
});

Yup.addMethod(Yup.string, 'notEmpty', notEmpty);
Yup.addMethod(Yup.string, 'emailLength', emailLength);

export default Yup;
