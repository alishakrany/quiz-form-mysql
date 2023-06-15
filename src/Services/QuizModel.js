const Sequelize = require('sequelize');
const db = require('./db');

const Quiz = db.define('quiz', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quizTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quizSynopsis: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// وظيفة لحفظ الامتحان في قاعدة البيانات
Quiz.prototype.saveQuiz = async function() {
    try {
      await this.save();
      console.log('تم حفظ الامتحان بنجاح!');
    } catch (error) {
      console.error('حدث خطأ أثناء حفظ الامتحان:', error);
    }
  };
  
  // وظيفة لاسترجاع الامتحان من قاعدة البيانات بناءً على الـ id
  Quiz.getQuizById = async function(id) {
    try {
      const quiz = await this.findByPk(id);
      if (quiz) {
        console.log('تم استرجاع الامتحان بنجاح:', quiz);
        return quiz;
      } else {
        console.log('لم يتم العثور على الامتحان المطلوب');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء استرجاع الامتحان:', error);
    }
  };
  
  // وظيفة لتحديث الامتحان في قاعدة البيانات
  Quiz.prototype.updateQuiz = async function() {
    try {
      await this.save();
      console.log('تم تحديث الامتحان بنجاح!');
    } catch (error) {
      console.error('حدث خطأ أثناء تحديث الامتحان:', error);
    }
  };
  
  // وظيفة لحذف الامتحان من قاعدة البيانات
  Quiz.deleteQuiz = async function(id) {
    try {
      const deletedQuiz = await this.destroy({
        where: { id: id }
      });
      if (deletedQuiz) {
        console.log('تم حذف الامتحان بنجاح');
      } else {
        console.log('لم يتم العثور على الامتحان المطلوب');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء حذف الامتحان:', error);
    }
  };


export default Quiz;