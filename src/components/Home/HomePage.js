import videoHomePage from '../../assets/homepage.mp4';

const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomePage}
                    type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>There's a better way to ask</div>
                <div className='title-2'>You don't want to make a boring from.And your audience won't answer one.
                    Created a typeform instead - and make everyone happy.</div>
                <div className='title-3'>
                    <button>Get's started. It's free</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;