import { describe, it, expect } from 'vitest';
import { ConfigServer } from '../ConfigServer';

describe('ConfigServer', () => {
    it('should return true for MAINTENANCE_PAGE when env variable is set to true', () => {
        process.env.MAINTENANCE_PAGE = 'true';
        expect(ConfigServer.MAINTENANCE_PAGE).toBe(true);
    });

    it('should return false for MAINTENANCE_PAGE when env variable is not set', () => {
        delete process.env.MAINTENANCE_PAGE;
        expect(ConfigServer.MAINTENANCE_PAGE).toBe(false);
    });

    it('should return false for MAINTENANCE_PAGE when env variable is set to false', () => {
        process.env.MAINTENANCE_PAGE = 'false';
        expect(ConfigServer.MAINTENANCE_PAGE).toBe(false);
    });

    it('should return false for MAINTENANCE_PAGE when env variable is set to an invalid value', () => {
        process.env.MAINTENANCE_PAGE = 'someInvalidValue';
        expect(ConfigServer.MAINTENANCE_PAGE).toBe(false);
    });
});
