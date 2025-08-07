export const mockUnleashClient = {
    start: vi.fn(),
    stop: vi.fn(),
    updateContext: vi.fn(),
    isEnabled: vi.fn(() => false),
    getVariant: vi.fn(() => ({ name: 'default', enabled: false })),
    on: vi.fn(),
    off: vi.fn(),
};

vi.mock('@unleash/proxy-client-react', () => ({
    ...vi.importActual('@unleash/proxy-client-react'),
    UnleashClient: vi.fn(() => mockUnleashClient),
}));
