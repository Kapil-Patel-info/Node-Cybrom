const homePage = (req,res)=>{
res.render("home");
};

const aboutPage = (req,res)=>{
res.render("about");
}

const servicesPage = (req,res)=>{
res.render("services");
}

const galleryPage = (req,res)=>{
res.render("gallery");
}

const placementPage = (req,res)=>{
res.render("placement");
}

const contactPage = (req,res)=>{
res.render("contact");
}

const joinPage = (req,res)=>{
res.render("join");
}

module.exports={
    homePage,aboutPage,servicesPage,galleryPage,placementPage,contactPage,joinPage
}