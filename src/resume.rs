use color_eyre::eyre::{eyre, Result};
use handlebars::Handlebars;
use serde::{Deserialize, Serialize};
use typeshare::typeshare;
use wasm_bindgen::prelude::*;
use crate::types::{Color, EmailAddress, PhoneNumber, Url};

const HTML_TEMPLATE: &str = include_str!("./templates/resume_html.hbs");
const MARKDOWN_TEMPLATE: &str = include_str!("./templates/resume_markdown.hbs");

// Felt cute, might refactor later to not have typeshare but we need this type to support it
// This will probably become a HTTP API at some point so that will open up the
// possibility of using an OpenAPI spec to generate the types
#[typeshare(serialized_as = "String")]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NaiveDate(#[serde(with = "naive_date_format")] chrono::NaiveDate);

mod naive_date_format {
    use chrono::NaiveDate;
    use serde::{self, Deserialize, Deserializer, Serializer};

    const FORMAT: &'static str = "%Y-%m-%d";

    pub fn serialize<S>(
        date: &NaiveDate,
        serializer: S,
    ) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = format!("{}", date.format(FORMAT));
        serializer.serialize_str(&s)
    }

    pub fn deserialize<'de, D>(
        deserializer: D,
    ) -> Result<NaiveDate, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        NaiveDate::parse_from_str(&s, FORMAT).map_err(serde::de::Error::custom)
    }
}

#[typeshare]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Experience {
    title: String,
    location: String,
    company: String,
    start_date: NaiveDate,
    end_date: Option<NaiveDate>,
    responsibilities: Vec<String>,
}

#[typeshare]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Education {
    degree: String,
    institution: String,
    graduation_year: u16,
}

#[typeshare]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Certification {
    name: String,
    issuer: String,
    year: u16,
}

#[typeshare]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Style {
    primary_color: Color,
    secondary_color: Color,
    font_family: String,
    text_color: Color,
    header_text_color: Color,
}

#[typeshare]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Resume {
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
#[wasm_bindgen]
#[typeshare]
#[derive(clap::ValueEnum, Clone, Debug, Serialize, Deserialize)]
pub enum OutputFormat {
    Html,
    Markdown,
}
#[derive(Debug, Clone)]
pub struct RenderArgs {
    pub resume: Resume,
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