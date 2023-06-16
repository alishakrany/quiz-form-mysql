const validate = values => {
  const errors = {}
  if (!values.quizTitle) {
    errors.quizTitle = 'مطلوب'
  }
  if (!values.questions || !values.questions.length) {
    errors.questions = { _error: 'يجب ان يكون هناك سؤال واحد على الاقل' }
  } else {
    const questionsArrayErrors = []
    values.questions.forEach((question, questionIndex) => {
      const questionErrors = {}
      if (!question || !question.question) {
        questionErrors.question = 'مطلوب'
        questionsArrayErrors[questionIndex] = questionErrors
      }
        if (!question.questionType){
          questionErrors.questionType =  'مطلوب';
          questionsArrayErrors[questionIndex] = questionErrors;
          
        }

      if (question && question.answers && question.answers.length) {
        const answerArrayErrors = []
        question.answers.forEach((answer, answerIndex) => {
        if (!answer || !answer.length) {
            answerArrayErrors[answerIndex] = 'مطلوب'
          }
        })

        if (answerArrayErrors.length) {
          questionErrors.answers = answerArrayErrors
          questionsArrayErrors[questionIndex] = questionErrors
        }

        if (question.answers.length > 4) {
          if (!questionErrors.answers) {
            questionErrors.answers = []
          }
          questionErrors.answers._error = 'اقصى عدد مسموح من الاجابات هو 4 فقط'
          questionsArrayErrors[questionIndex] = questionErrors
        }
        if (!question.correctAnswer){
          questionErrors.correctAnswer =  'مطلوب';
          questionsArrayErrors[questionIndex] = questionErrors;
         }
      }

      if (!question.answers || question.answers.length === 0) {
        if (!questionErrors.answers) {
          questionErrors.answers = []
        }
        questionErrors.answers._error = 'يجب ادخال إجابة واحدة على الاقل'
        questionsArrayErrors[questionIndex] = questionErrors
      }

      if (!question.point){
        questionErrors.point =  'مطلوب';
        questionsArrayErrors[questionIndex] = questionErrors;
        
      }
  

    })

    if (questionsArrayErrors.length) {
      errors.questions = questionsArrayErrors
    }


  }
  return errors
}

export default validate