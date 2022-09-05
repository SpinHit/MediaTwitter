// Footer ou on va afficher le copyright avec l'année en cours

function Footer() {
    return (
        <footer>
            <h4>
                Copyright &copy; MediaTwitter {new Date().getFullYear()}
            </h4>
        </footer>
    );
}

export default Footer;