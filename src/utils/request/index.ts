import Xrequest from "./request";


export const XrequestInstance = new Xrequest({
    timeout: 6000,
    baseURL: 'https://cad-answer.thermo-fisher.ms-vm.synconize.com/api/fission/',
});
