mod types;
mod resume;

use wasm_bindgen::prelude::*;
use crate::resume::{OutputFormat, render_resume, RenderArgs, Resume};

#[wasm_bindgen]
pub fn generate_resume(resume: JsValue, format: &str) -> Result<String, JsValue> {
    let resume: Resume = serde_wasm_bindgen::from_value(resume)?;

    let output_format = match format.to_lowercase().as_str() {
        "html" => OutputFormat::Html,
        "markdown" => OutputFormat::Markdown,
        _ => return Err(JsValue::from_str("Invalid output format. Use 'html' or 'markdown'.")),
    };

    let args = RenderArgs {
        resume,
        format: output_format,
    };

    let rendered = render_resume(&args)
        .map_err(|e| JsValue::from_str(&format!("Failed to render resume: {}", e)))?;

    Ok(String::from_utf8(rendered)
        .map_err(|e| JsValue::from_str(&format!("Failed to convert rendered resume to string: {}", e)))?)
}

#[wasm_bindgen(start)]
pub fn main() {
    console_error_panic_hook::set_once();
}