use crate::cli::{OutputDestination};
use crate::types::{PhoneNumber, EmailAddress, Url, Color};
use chrono::NaiveDate;
use color_eyre::eyre::{Result, eyre};
use handlebars::Handlebars;
use serde::{Deserialize, Serialize};

const HTML_TEMPLATE: &str = include_str!("./templates/resume_html.hbs");
const MARKDOWN_TEMPLATE: &str = include_str!("./templates/resume_markdown.hbs");

#[derive(Debug, Clone, Serialize, Deserialize)]
pub(crate) struct Experience {
    title: String,
    location: String,
    company: String,
    start_date: NaiveDate,
    end_date: Option<NaiveDate>,
    responsibilities: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub(crate) struct Education {
    degree: String,
    institution: String,
    graduation_year: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub(crate) struct Certification {
    name: String,
    issuer: String,
    year: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub(crate) struct Style {
    primary_color: Color,
    secondary_color: Color,
    font_family: String,
    text_color: Color,
    header_text_color: Color,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub(crate) struct Resume {
    name: String,
    title: String,
    location: String,
    linkedin: Url,
    email: EmailAddress,
    phone: PhoneNumber,
    summary: String,
    skills: Vec<String>,
    experience: Vec<Experience>,
    education: Option<Vec<Education>>,
    certifications: Option<Vec<Certification>>,
    made_with: Option<Url>,
    style: Option<Style>,
}

// Can't decide if this should live here or in the cli module or have two enums
#[derive(clap::ValueEnum, Clone, Debug)]
pub enum OutputFormat {
    Html,
    Markdown,
}
#[derive(Debug, Clone)]
pub struct RenderArgs {
    pub resume: Resume,
    pub output: OutputDestination,
    pub format: OutputFormat,
}
trait Render {
    fn render(&self, handlebars: &Handlebars, template_name: &str) -> Result<String>;
}

impl Render for Resume {
    fn render(&self, handlebars: &Handlebars, template_name: &str) -> Result<String> {
        handlebars.render(template_name, &self).map_err(|e| eyre!(e))
    }
}
pub fn render_resume(args: &RenderArgs) -> Result<Vec<u8>> {
    let mut handlebars = Handlebars::new();
    handlebars.set_strict_mode(true);

    let (template, template_name) = match args.format {
        OutputFormat::Html => (HTML_TEMPLATE, "resume_html"),
        OutputFormat::Markdown => (MARKDOWN_TEMPLATE, "resume_markdown"),
    };
    handlebars.register_template_string(template_name, template)?;

    let output = args.resume.render(&handlebars, template_name)?;
    Ok(output.into_bytes())
}