const homePage = (req, res) => {
    res.render("home");  
};

const aboutPage = (req, res) => {
    res.render("about");  
};

const contactPage = (req, res) => {
    res.render("contact");  
};

const facultyPage= (req, res) => {
    res.render("faculty");  
};

const coursesPage= (req, res) => {
    res.render("faculty");  
};

module.exports = {
    homePage,
    aboutPage,
    contactPage,
    coursesPage,
    facultyPage
};
