import React, {useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import range from 'lodash/range';
import validate from '../Helpers/validate';
import CategorySelection from './Category';
import {firestore} from '../Services/firebaseConfig'; // استيراد ملف التكوين الخاص بـ Firebase

// استيراد وظيفة حفظ الاختبار
// import Quiz, { saveQuiz } from '../Services/QuizModel';

class QuizForm extends Component {
  state = {
    submitted: false
  };


  renderInputField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  renderTextareaField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <textarea {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
      <label>{label}</label>
      <div>
        <select {...input}>
          {children}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  renderSelectQuestionTypeField = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
      <label>{label}</label>
      <div>
        <select {...input}>
          {children}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  renderTextAnswers = ({ fields, question, meta: { error } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push()}> إضافة اجابة</button>
      </li>
      {fields.map((answer, index) => (
        <li key={index}>
          <button
            type="button"
            title="حذف الاجابة"
            onClick={() => fields.remove(index)}
          />
          <Field
            name={answer}
            type="text"
            component={this.renderInputField}
            label={`اجابة #${index + 1}`}
          />
        </li>
      ))}
      <li>
        <Field
          name={`${question}.correctAnswer`}
          component={this.renderSelectField}
          label="الاجابة الصحيحة"
        >
          <option value="">اختر الاجابة الصحيحة</option>
          {fields.map((answer, index) => (
            <option key={index + 1} value={index + 1}>{`الاجابة #${index + 1}`}</option>
          ))}
        </Field>
      </li>

      {error && <li className="error">{error}</li>}
    </ul>
  );

  renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}> إضافة سؤال</button>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </li>
      {fields.map((question, index) => (
        <li key={index}>
          <button
            type="button"
            title="حذف السؤال"
            onClick={() => fields.remove(index)}
          />
          <h4>السؤال #{index + 1}</h4>
          <Field
            name={`${question}.question`}
            type="text"
            component={this.renderInputField}
            label="السؤال"
          />
          <Field
            name={`${question}.questionType`}
            component={this.renderSelectQuestionTypeField}
            label="نوع السؤال"
            defaultValue="text"
          >
            <option  value="text">نص</option>
            <option value="photo">صورة</option>
          </Field>
          <FieldArray name={`${question}.answers`} component={this.renderTextAnswers} question={question} />
          <Field
            name={`${question}.messageForCorrectAnswer`}
            type="text"
            component={this.renderTextareaField}
            label="عندما تكون الاجابة صحيحة"
          />
          <Field
            name={`${question}.messageForIncorrectAnswer`}
            type="text"
            component={this.renderTextareaField}
            label="عندما تكون الاجابة خطأ"
          />
          <Field
            name={`${question}.explanation`}
            type="text"
            component={this.renderTextareaField}
            label="التفسير"
          />
          <Field
            name={`${question}.point`}
            type="number"
            component={this.renderInputField}
            label="الدرجة"
          />

        </li>
      ))}
    </ul>
  );

//=============== send data to firebase ====================
  onSubmit = (values) => {
    const { category, ...data } = values; // استخراج قيمة الفئة من القيم المدخلة
    // حفظ الاختبار في قاعدة البيانات Firebase
    firestore.collection(category || 'other').add(values)
    .then((docRef) => {
      console.log('تم ارسال الاختبار بنجاح:', docRef.id);
     this.setState({ submitted: true });
        this.props.reset();
    })
    .catch((error) => {
      console.error('حدث خطأ ما اثناء الارسال:', error);
    });
  };


  
  // handleSubmit = (values) => {
  //   // قم بتشغيل وظيفة saveQuiz هنا واستخدامها لحفظ الاختبار
  //   const quiz = new Quiz();
  //   quiz.quizTitle = values.quizTitle;
  //   quiz.quizSynopsis = values.quizSynopsis;
  //   quiz.saveQuiz(); // استخدام وظيفة saveQuiz
  // }

  

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { submitted } = this.state;


    return (
      <div className="QuizForm">
         {submitted && (
          <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', fontSize: '25px', marginBottom:'7px' }}>
            تم إرسال البيانات بنجاح!
          </p>
        )}
        <form name="quiz-form" onSubmit={handleSubmit(this.onSubmit)}>

          <Field
            name="category"
            component={this.renderSelectField}
            label="الفئة"
            //value="2"
          >
              <option value="">الفئة</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="other">3</option>
          </Field>           

        {/*  <CategorySelection /> */}
          <Field
            name="quizTitle"
            type="text"
            component={this.renderInputField}
            label="عنوان الاختبار"
          />
          <Field
            name="quizSynopsis"
            type="text"
            component={this.renderTextareaField}
            label="وصف الاختبار"
          />
          <FieldArray name="questions" component={this.renderQuestions} />
          <div>
            <button type="submit" disabled={submitting}>ارسال</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
             مسح القيم
            </button>
          </div>
        </form>
      </div>
    );
  }
}

QuizForm = reduxForm({
  form: 'quizForm',
  validate
})(QuizForm);

const selector = formValueSelector('quizForm');

QuizForm = connect(
  state => {
    const questions = selector(state, 'questions');
    const questionType = questions && questions.map(question => question.questionType);

    return { questionType: questionType };
  }
)(QuizForm);

export default QuizForm;