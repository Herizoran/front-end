/* tslint:disable */
/* eslint-disable */
/**
 * JobOffers manager for Library
 * This is the API to get access to the application that manage applications and Job Offers. 
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { JobOffer } from './job-offer';
/**
 * 
 * @export
 * @interface Application
 */
export interface Application {
    /**
     * 
     * @type {number}
     * @memberof Application
     */
    idApplication?: number;
    /**
     * 
     * @type {string}
     * @memberof Application
     */
    candidateName?: string;
    /**
     * 
     * @type {string}
     * @memberof Application
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof Application
     */
    profile?: string;
    /**
     * 
     * @type {number}
     * @memberof Application
     */
    salary?: number;
    /**
     * 
     * @type {string}
     * @memberof Application
     */
    dateApplication?: string;
    /**
     * 
     * @type {JobOffer}
     * @memberof Application
     */
    jobOffer: JobOffer;
}