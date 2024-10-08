function HandleProviderSubmit(e)
{
   e.preventDefault();
    setCheck(true);
    const subData = new FormData(e.target);

    subData.append("companyLisenceFile", FileList2[0]?.originFileObj);
    subData.append("vatFileFile", vatFileList[0]?.originFileObj);
    subData.append("providerLogoFile", logoFileList[0]?.originFileObj);
    subData.append("providerCoverPhotoFile", coverFileList[0]?.originFileObj);

    for (var value of subData.values()) {
      console.log("valuess", value);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (providerStatusValue === 0) {
      setProviderStatusError(true);
    } else if (!providerName) {
      setProviderNameError("Provider Name is required");
    } else if (!officialEmail) {
      setOfficialEmailError("Official Email is required");
    } else if (!financeEmail) {
      setFinanceEmailError("Finance Email is required");
    } else if (!officialPhone) {
      setOfficialPhoneError("");
    } else if (providerTypeValue === 0) {
      setProviderTypeError(true);
    } else if (!companyLicenseNumber) {
      setCompanyLicenseNumberError("Company License Number is required");
    } else if (!vatNumber) {
      setVatNumberError("Vat Number is required");
    } else if (logoFileList?.length < 1 && check) {
      setImgError(true);
    } else if (coverFileList?.length < 1 && check) {
      setCoverImgError(true);
    } else {
      setButtonStatus(true);
      setProgress(true);
      put(`Provider/Update`, subData, config).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/providerList");
      });
    }
}
