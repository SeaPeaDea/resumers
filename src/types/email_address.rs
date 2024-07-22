use serde_with::{DeserializeFromStr, SerializeDisplay};
use std::str::FromStr;
use typeshare::typeshare;

#[typeshare]
#[derive(Debug, Clone, SerializeDisplay, DeserializeFromStr)]
pub struct EmailAddress(String);

impl FromStr for EmailAddress {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if s.contains('@') && s.split('@').count() == 2 {
            Ok(EmailAddress(s.to_string()))
        } else {
            Err("Invalid email address".to_string())
        }
    }
}

impl std::fmt::Display for EmailAddress {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}