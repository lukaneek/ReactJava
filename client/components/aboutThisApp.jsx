const AboutThisApp = () => {

    return (
        <>
            <h3>About this app</h3>
            <p>This is a React and Java app that uses a CI/CD pipeline through github, deployed on two EC2 instances in AWS.  The first instance hosts the React frontend.  The second instance provides REST API's written in Java, that are called from the React frontend. Any changes committed to this github repository auto updates this app.  This app also uses Google's address verification API's.</p>
            <p/>
            <a target="_blank" href="https://github.com/lukaneek/ReactJava">Link To This Applications Repository</a>
        </>
    );
}

export default AboutThisApp;