import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string().label('Email').email('Invalid email address').required(),
});

export default schema;
