use clap::Parser;
use color_eyre::eyre::{Result};
use std::path::PathBuf;
use std::fs;
use crate::resume::{OutputFormat, RenderArgs};

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct CliArgs {
    #[arg(short, long)]
    input: PathBuf,

    #[arg(short, long)]
    pub(crate) output: PathBuf,

    #[arg(short, long, value_enum)]
    pub(crate) format: OutputFormat,
}

impl TryFrom<CliArgs> for RenderArgs {
    type Error = color_eyre::Report;

    fn try_from(cli_args: CliArgs) -> Result<Self, Self::Error> {
        let input_content = fs::read_to_string(&cli_args.input)?;

        let resume = serde_json::from_str(&input_content)?;

        Ok(RenderArgs {
            resume,
            format: cli_args.format,
        })
    }
}