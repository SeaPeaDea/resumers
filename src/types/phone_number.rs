use serde_with::{DeserializeFromStr, SerializeDisplay};
use std::str::FromStr;
use typeshare::typeshare;

#[typeshare]
#[derive(Debug, Clone, SerializeDisplay, DeserializeFromStr)]
pub struct PhoneNumber(String);

impl FromStr for PhoneNumber {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let digits: String = s.chars().filter(|c| c.is_digit(10)).collect();
        if digits.len() == 10 || digits.len() == 11 {
            Ok(PhoneNumber(digits))
        } else {
            Err("Invalid phone number".to_string())
        }
    }
}

impl std::fmt::Display for PhoneNumber {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}