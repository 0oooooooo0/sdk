import {
  IPAccountExecuteRequest,
  IPAccountExecuteResponse,
  IPAccountExecuteWithSigRequest,
  IPAccountExecuteWithSigResponse,
  IpAccountImplStateResponse,
} from "@story-protocol/core-sdk";

import { useStoryContext } from "../StoryProtocolContext";
import { handleError } from "../util";
import { useLoading } from "../hooks/useLoading";
import { useErrors } from "../hooks/useError";

const useIpAccount = () => {
  const client = useStoryContext();
  const [loadings, setLoadings] = useLoading({
    execute: false,
    executeWithSig: false,
    getIpAccountNonce: false,
  });
  const [errors, setErrors] = useErrors({
    execute: null,
    executeWithSig: null,
    getIpAccountNonce: null,
  });

  /** Executes a transaction from the IP Account.
   * @param request - The request object containing necessary data to execute IP Account a transaction.
   *   @param request.ipId The Ip Id to get ip account.
   *   @param request.to The recipient of the transaction.
   *   @param request.value The amount of Ether to send.
   *   @param request.accountAddress The ipId to send.
   *   @param request.data The data to send along with the transaction.
   * @returns Tx hash for the transaction.
   */
  const execute = async (
    request: IPAccountExecuteRequest
  ): Promise<IPAccountExecuteResponse> => {
    try {
      setLoadings("execute", true);
      setErrors("execute", null);
      const response = await client.ipAccount.execute(request);
      setLoadings("execute", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("execute", errorMessage);
      setLoadings("execute", false);
      throw new Error(errorMessage);
    }
  };

  /** Executes a transaction from the IP Account.
   * @param request - The request object containing necessary data to execute IP Account a transaction.
   *   @param request.ipId The Ip Id to get ip account.
   *   @param request.to The recipient of the transaction.
   *   @param request.value The amount of Ether to send.
   *   @param request.data The data to send along with the transaction.
   *   @param request.signer The signer of the transaction.
   *   @param request.deadline The deadline of the transaction signature.
   *   @param request.signature The signature of the transaction, EIP-712 encoded.
   * @returns Tx hash for the transaction.
   */
  const executeWithSig = async (
    request: IPAccountExecuteWithSigRequest
  ): Promise<IPAccountExecuteWithSigResponse> => {
    try {
      setLoadings("executeWithSig", true);
      setErrors("executeWithSig", null);
      const response = await client.ipAccount.executeWithSig(request);
      setLoadings("executeWithSig", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("executeWithSig", errorMessage);
      setLoadings("executeWithSig", false);
      throw new Error(errorMessage);
    }
  };

  /** Returns the IPAccount&#39;s internal nonce for transaction ordering.
   * @param ipId The IP ID
   * @returns The nonce for transaction ordering.
   */
  const getIpAccountNonce = async (
    ipId: string
  ): Promise<IpAccountImplStateResponse> => {
    try {
      setLoadings("getIpAccountNonce", true);
      setErrors("getIpAccountNonce", null);
      const response = await client.ipAccount.getIpAccountNonce(ipId);
      setLoadings("getIpAccountNonce", false);
      return response;
    } catch (e) {
      const errorMessage = handleError(e);
      setErrors("getIpAccountNonce", errorMessage);
      setLoadings("getIpAccountNonce", false);
      throw new Error(errorMessage);
    }
  };

  return {
    loadings,
    errors,
    execute,
    executeWithSig,
    getIpAccountNonce,
  };
};
export default useIpAccount;
