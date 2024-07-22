use clap::Parser;
use color_eyre::eyre::Result;

use crate::cli::CliArgs;

mod types;
mod cli;
mod resume;

fn main() -> Result<()> {
    color_eyre::install()?;

    let args = CliArgs::parse();
    let output = args.output.clone();
    let rendered_resume = resume::render_resume(&args.try_into()?)?;

    std::fs::write(output, rendered_resume)?;
    println!("Resume generated successfully!");


    Ok(())
}