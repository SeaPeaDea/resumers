use clap::Parser;
use color_eyre::eyre::{Result, eyre};
use std::path::PathBuf;
use std::fs;
use crate::resume::{OutputFormat, RenderArgs};


#[derive(Debug, Clone)]
pub enum OutputDestination {
    File(PathBuf),
    Memory,
}

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct CliArgs {
    #[arg(short, long)]
    input: PathBuf,

    #[arg(short, long)]
    output: Option<PathBuf>,

    #[arg(short, long, value_enum)]
    format: OutputFormat,
}

impl TryFrom<CliArgs> for RenderArgs {
    type Error = color_eyre::Report;

    fn try_from(cli_args: CliArgs) -> Result<Self, Self::Error> {
        let input_content = fs::read_to_string(&cli_args.input)?;

        let resume = serde_json::from_str(&input_content)?;

        let output = match cli_args.output {
            Some(path) => OutputDestination::File(path),
            None => OutputDestination::Memory,
        };

        Ok(RenderArgs {
            resume,
            output,
            format: cli_args.format,
        })
    }
}

pub fn parse_args() -> Result<RenderArgs> {
    let cli_args = CliArgs::parse();
    RenderArgs::try_from(cli_args).map_err(|e| eyre!("Failed to parse arguments: {}", e))
}