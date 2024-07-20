use serde_with::{DeserializeFromStr, SerializeDisplay};
use std::str::FromStr;

#[derive(Debug, Clone, SerializeDisplay, DeserializeFromStr)]
pub struct Url(String);

impl FromStr for Url {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if s.starts_with("http://") || s.starts_with("https://") {
            Ok(Url(s.to_string()))
        } else {
            Err("Invalid URL".to_string())
        }
    }
}

impl std::fmt::Display for Url {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}