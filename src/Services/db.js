import Sequelize from 'sequelize';
//import mysql2 from 'mysql2';

// تكوين اتصال Sequelize بقاعدة البيانات
const sequelize = new Sequelize('quiz-form-db', 'quiz-form-db', '12345678', {
  host: '206.189.59.145',
  dialect: 'mysql',
});


// اختبار الاتصال بقاعدة البيانات
sequelize
  .authenticate()
  .then(() => {
    console.log('تم بنجاح الاتصال بقاعدة البيانات.');
  })
  .catch((error) => {
    console.error('فشل الاتصال بقاعدة البيانات:', error);
  });

export default sequelize;
