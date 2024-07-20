mod types;
mod cli;
mod resume;

use color_eyre::eyre::Result;
use cli::{parse_args, OutputDestination};

fn main() -> Result<()> {
    color_eyre::install()?;

    let args = parse_args()?;
    let rendered_resume = resume::render_resume(&args)?;

    match args.output {
        OutputDestination::File(path) => {
            std::fs::write(path, rendered_resume)?;
            println!("Resume generated successfully!");
        },
        OutputDestination::Memory => {
            println!("Resume content:");
            println!("{}", String::from_utf8_lossy(&rendered_resume));
        }
    }

    Ok(())
}