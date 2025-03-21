package com.example.demo.utils;

public class GoogleValidationInput {

	private String regionCode = "US";
	private String locality;
	private String administrativeArea;
	private String postalCode;
	private String[] addressLines;

	public GoogleValidationInput() {
	}

	public String getRegionCode() {
		return regionCode;
	}

	public void setRegionCode(String regionCode) {
		this.regionCode = regionCode;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getAdministrativeArea() {
		return administrativeArea;
	}

	public void setAdministrativeArea(String administrativeArea) {
		this.administrativeArea = administrativeArea;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String[] getAddressLines() {
		return addressLines;
	}

	public void setAddressLines(String[] addressLines) {
		this.addressLines = addressLines;
	}

	

}
