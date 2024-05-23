import * as Yup from 'yup';

const schema = Yup.object({
  password: Yup.string()
    .label('Password')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(64, 'Password is too long - should be 64 chars maximum')
    .test('space', 'Your password must be space-free', function (value) {
      if (value) {
        return !value.includes(' ');
      }
    })
    .test(
      'weak',
      'Password must include at least one capital, small letter and number',
      function (value) {
        if (!value) {
          return true;
        }

        const hasSmallChar = !!value.match(/[a-z]/);
        const hasCapitalChar = !!value.match(/[A-Z]/);
        const hasNumbersChar = !!value.match(/\d/);

        return hasSmallChar && hasCapitalChar && hasNumbersChar;
      }
    )
    .required(),

  confirm_password: Yup.string()
    .label('Password confirmation')
    .oneOf([Yup.ref('password')], 'Password does not match')
    .required(),
});

export default schema;
