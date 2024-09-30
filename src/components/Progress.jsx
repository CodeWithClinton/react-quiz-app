
const Progress = ({numQuestions, questionIndex, username}) => {
  return (
    <header className='progress'>
    <progress max={numQuestions} value={questionIndex + Number(true)} />
    <p>Question <strong>{questionIndex + 1}</strong> / {numQuestions} </p>

    <p>Hi, <strong style={{textTransform: "uppercase"}}>{username}</strong></p>

</header>
  )
}

export default Progress
