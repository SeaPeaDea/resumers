//! # resumers
//!
//! This program generates a resume in either HTML or Markdown format from a JSON input file.
//!
//! ## Usage
//!
//! To run the program, use the following command:
//!
//! ```
//! cargo run -- --input <path_to_input_json> --output <path_to_output_file> --format <html|markdown>
//! ```
//!
//! For example, to generate an HTML resume using the test data:
//!
//! ```
//! cargo run -- --input ./src/test_data/test_input.json --output resume.html --format html
//! ```
//!
//! To generate a Markdown resume:
//!
//! ```
//! cargo run -- --input ./src/test_data/test_input.json --output resume.md --format markdown
//! ```

use clap::Parser;
use handlebars::Handlebars;
use serde::{Deserialize, Serialize};
use std::error::Error;
use std::fs;
use std::path::PathBuf;

const HTML_TEMPLATE: &'static str = include_str!("./templates/resume_html.hbs");
const MARKDOWN_TEMPLATE: &'static str = include_str!("./templates/resume_markdown.hbs");

#[derive(Serialize, Deserialize)]
struct Experience {
    title: String,
    location: String,
    company: String,
    start_date: String,
    end_date: String,
    responsibilities: Vec<String>,
}

#[derive(Serialize, Deserialize)]
struct Education {
    degree: String,
    institution: String,
    graduation_year: String,
}

#[derive(Serialize, Deserialize)]
struct Certification {
    name: String,
    issuer: String,
    year: String,
}

#[derive(Serialize, Deserialize)]
struct Style {
    primary_color: String,
    secondary_color: String,
    font_family: String,
    text_color: String,
    header_text_color: String,
}

#[derive(Serialize, Deserialize)]
struct Resume {
    name: String,
    title: String,
    location: String,
    linkedin: String,
    email: String,
    phone: String,
    summary: String,
    skills: Vec<String>,
    experience: Vec<Experience>,
    education: Option<Vec<Education>>,
    certifications: Option<Vec<Certification>>,
    made_with: Option<String>,
    style: Option<Style>,
}

#[derive(clap::ValueEnum, Clone, Debug)]
enum OutputFormat {
    Html,
    Markdown,
}

struct ResumeArgs {
    input: String,

    format: OutputFormat,
}

impl From<CliArgs> for ResumeArgs {
    fn from(cli_args: CliArgs) -> Self {
        Self {
            input: cli_args.input,
            format: cli_args.format,
        }
    }
}

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct CliArgs {
    #[arg(short, long)]
    input: String,

    #[arg(short, long)]
    output: PathBuf,

    #[arg(short, long, value_enum)]
    format: OutputFormat,
}

fn render_resume(args: ResumeArgs) -> Result<Vec<u8>, Box<dyn Error>> {
    let resume: Resume = serde_json::from_str(&args.input)?;

    let mut handlebars = Handlebars::new();
    handlebars.set_strict_mode(true);
    // Register the appropriate template based on the output format
    let template = match args.format {
        OutputFormat::Html => HTML_TEMPLATE,
        OutputFormat::Markdown => MARKDOWN_TEMPLATE,
    };
    let template_name = match args.format {
        OutputFormat::Html => "resume_html",
        OutputFormat::Markdown => "resume_markdown",
    };
    handlebars.register_template_string(template_name, template)?;

    let output = handlebars.render(template_name, &resume)?;

    Ok(output.into_bytes())
}

fn main() -> Result<(), Box<dyn Error>> {
    let args = CliArgs::parse();

    // Read the input JSON file
    let input_content = fs::read_to_string(&args.input)?;

    let resume_args = ResumeArgs {
        input: input_content,
        format: args.format,
    };

    let resume = render_resume(resume_args)?;

    fs::write(args.output, resume)?;

    println!("Resume generated successfully!");

    Ok(())
}