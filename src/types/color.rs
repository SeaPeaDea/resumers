use serde_with::{DeserializeFromStr, SerializeDisplay};
use std::str::FromStr;

#[derive(Debug, Clone, SerializeDisplay, DeserializeFromStr)]
pub struct Color(String);

impl FromStr for Color {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if s.starts_with('#') && (s.len() == 4 || s.len() == 7) {
            Ok(Color(s.to_string()))
        } else {
            Err("Invalid color format".to_string())
        }
    }
}

impl std::fmt::Display for Color {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}