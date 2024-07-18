import {
  RegisterNonComSocialRemixingPILRequest,
  RegisterPILResponse,
  RegisterCommercialUsePILRequest,
  RegisterCommercialRemixPILRequest,
  AttachLicenseTermsRequest,
  AttachLicenseTermsResponse,
  MintLicenseTokensRequest,
  MintLicenseTokensResponse,
  LicenseTermsId,
  PiLicenseTemplateGetLicenseTermsResponse,
} from "@story-protocol/core-sdk";

import { useStoryContext } from "../StoryProtocolContext";
import { handleError } from "../util";
import { useLoading } from "../hooks/useLoading";
import { useErrors } from "../hooks/useError";

const useLicense = () => {
  const client = useStoryContext();
  const [loadings, setLoadings] = useLoading({
    registerNonComSocialRemixingPIL: false,
    registerCommercialUsePIL: false,
    registerCommercialRemixPIL: false,
    attachLicenseTerms: false,
    mintLicenseTokens: false,
    getLicenseTerms: false,
  });
  const [errors, setErrors] = useErrors({
    registerNonComSocialRemixingPIL: null,
    registerCommercialUsePIL: null,
    registerCommercialRemixPIL: null,
    attachLicenseTerms: null,
    mintLicenseTokens: null,
    getLicenseTerms: null,
  });

  /**
   * Convenient function to register a PIL non commercial social remix license to the registry
   * @param request - [Optional] The request object that contains all data needed to register a PIL non commercial social remix license.
   *   @param request.txOptions [Optional] The transaction options.
   * @returns A Promise that resolves to an object containing the optional transaction hash and optional license terms Id.
   * @emits LicenseTermsRegistered (licenseTermsId, licenseTemplate, licenseTerms);
   */
  const registerNonComSocialRemixingPIL = async (
    request: RegisterNonComSocialRemixingPILRequest
  ): Promise<RegisterPILResponse> => {
    try {
      setLoadings("registerNonComSocialRemixingPIL", true);
      setErrors("registerNonComSocialRemixingPIL", null);
      const response = await client.license.registerNonComSocialRemixingPIL(
        request
      );
      setLoadings("registerNonComSocialRemixingPIL", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("registerNonComSocialRemixingPIL", errorMessage);
      setLoadings("registerNonComSocialRemixingPIL", false);
      throw new Error(errorMessage);
    }
  };

  /**
   * Convenient function to register a PIL commercial use license to the registry.
   * @param request - The request object that contains all data needed to register a PIL commercial use license.
   *   @param request.mintingFee The fee to be paid when minting a license.
   *   @param request.currency The ERC20 token to be used to pay the minting fee and the token must be registered in story protocol.
   *   @param request.txOptions [Optional] The transaction options.
   * @returns A Promise that resolves to an object containing the optional transaction hash and optional license terms Id.
   * @emits LicenseTermsRegistered (licenseTermsId, licenseTemplate, licenseTerms);
   */
  const registerCommercialUsePIL = async (
    request: RegisterCommercialUsePILRequest
  ): Promise<RegisterPILResponse> => {
    try {
      setLoadings("registerCommercialUsePIL", true);
      setErrors("registerCommercialUsePIL", null);
      const response = await client.license.registerCommercialUsePIL(request);
      setLoadings("registerCommercialUsePIL", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("registerCommercialUsePIL", errorMessage);
      setLoadings("registerCommercialUsePIL", false);
      throw new Error(errorMessage);
    }
  };

  /**
   * Convenient function to register a PIL commercial Remix license to the registry.
   * @param request - The request object that contains all data needed to register license.
   *   @param request.mintingFee The fee to be paid when minting a license.
   *   @param request.commercialRevShare Percentage of revenue that must be shared with the licensor.
   *   @param request.currency The ERC20 token to be used to pay the minting fee. the token must be registered in story protocol.
   *   @param request.txOptions [Optional] The transaction options.
   * @returns A Promise that resolves to an object containing the optional transaction hash and optional license terms Id.
   * @emits LicenseTermsRegistered (licenseTermsId, licenseTemplate, licenseTerms);
   */
  const registerCommercialRemixPIL = async (
    request: RegisterCommercialRemixPILRequest
  ): Promise<RegisterPILResponse> => {
    try {
      setLoadings("registerCommercialRemixPIL", true);
      setErrors("registerCommercialRemixPIL", null);
      const response = await client.license.registerCommercialRemixPIL(request);
      setLoadings("registerCommercialRemixPIL", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("registerCommercialRemixPIL", errorMessage);
      setLoadings("registerCommercialRemixPIL", false);
      throw new Error(errorMessage);
    }
  };

  /**
   * Attaches license terms to an IP.
   * @param request - The request object that contains all data needed to attach license terms.
   *   @param request.ipId The address of the IP to which the license terms are attached.
   *   @param request.licenseTemplate The address of the license template.
   *   @param request.licenseTermsId The ID of the license terms.
   *   @param request.txOptions [Optional] The transaction options.
   * @returns A Promise that resolves to an object containing the transaction hash.
   */
  const attachLicenseTerms = async (
    request: AttachLicenseTermsRequest
  ): Promise<AttachLicenseTermsResponse> => {
    try {
      setLoadings("attachLicenseTerms", true);
      setErrors("attachLicenseTerms", null);
      const response = await client.license.attachLicenseTerms(request);
      setLoadings("attachLicenseTerms", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("attachLicenseTerms", errorMessage);
      setLoadings("attachLicenseTerms", false);
      throw new Error(errorMessage);
    }
  };

  /**
   * Mints license tokens for the license terms attached to an IP.
   * The license tokens are minted to the receiver.
   * The license terms must be attached to the IP before calling this function.
   * But it can mint license token of default license terms without attaching the default license terms,
   * since it is attached to all IPs by default.
   * IP owners can mint license tokens for their IPs for arbitrary license terms
   * without attaching the license terms to IP.
   * It might require the caller pay the minting fee, depending on the license terms or configured by the iP owner.
   * The minting fee is paid in the minting fee token specified in the license terms or configured by the IP owner.
   * IP owners can configure the minting fee of their IPs or
   * configure the minting fee module to determine the minting fee.
   * @param request - The request object that contains all data needed to mint license tokens.
   *   @param request.licensorIpId The licensor IP ID.
   *   @param request.licenseTemplate The address of the license template.
   *   @param request.licenseTermsId The ID of the license terms within the license template.
   *   @param request.amount The amount of license tokens to mint.
   *   @param request.receiver The address of the receiver.
   *   @param request.txOptions [Optional] The transaction options.
   * @returns A Promise that resolves to an object containing the transaction hash and optional license token IDs if waitForTxn is set to true.
   * @emits LicenseTokensMinted (msg.sender, licensorIpId, licenseTemplate, licenseTermsId, amount, receiver, startLicenseTokenId);
   */
  const mintLicenseTokens = async (
    request: MintLicenseTokensRequest
  ): Promise<MintLicenseTokensResponse> => {
    try {
      setLoadings("mintLicenseTokens", true);
      setErrors("mintLicenseTokens", null);
      const response = await client.license.mintLicenseTokens(request);
      setLoadings("mintLicenseTokens", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("mintLicenseTokens", errorMessage);
      setLoadings("mintLicenseTokens", false);
      throw new Error(errorMessage);
    }
  };

  /**
   * Gets license terms of the given ID.
   * @param selectedLicenseTermsId The ID of the license terms.
   * @returns A Promise that resolves to an object containing the PILTerms associate with the given ID.
   */
  const getLicenseTerms = async (
    selectedLicenseTermsId: LicenseTermsId
  ): Promise<PiLicenseTemplateGetLicenseTermsResponse> => {
    try {
      setLoadings("getLicenseTerms", true);
      setErrors("getLicenseTerms", null);
      const response = await client.license.getLicenseTerms(
        selectedLicenseTermsId
      );
      setLoadings("getLicenseTerms", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("getLicenseTerms", errorMessage);
      setLoadings("getLicenseTerms", false);
      throw new Error(errorMessage);
    }
  };

  return {
    loadings,
    errors,
    registerNonComSocialRemixingPIL,
    registerCommercialUsePIL,
    registerCommercialRemixPIL,
    attachLicenseTerms,
    mintLicenseTokens,
    getLicenseTerms,
  };
};
export default useLicense;
