import './index.css'

const Landing = () => {
    return (
        <div className='landing-con'>
            <h4 className="landing-title">Image prompt guessing game.</h4>
            <p className='landing-subtitle'>You will be shown an image and four possible prompts. 
                Choose the correct prompt to score points. Good luck!</p>
            <button>Start Game</button>
        </div>
    )
}

export default Landing