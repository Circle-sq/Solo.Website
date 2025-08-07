interface AvvplConfig {
    id: string;
    allowFullScreen: boolean;
}

interface SimpleEvent {
    subscribe: (param: unknown) => void;
}
interface Avvpl {
    pause: SimpleEvent;
    play: SimpleEvent;
    remove(): void;
}

interface WindowData {
    betting: any;
    cashout: any;
    competitions: any;
    content: any;
    events: any;
    form: any;
    media: any;
    sports: any;
}

interface STATSCOREWidgets {
    onLoad: (callback: (err: { type: string } | null) => void) => void;
    WidgetGroup: new (
        element: HTMLElement | null,
        configurationId: string,
        inputData: { eventId: string; language: string },
        options: Record<string, unknown>,
    ) => void;
}

interface SDW {
    mount(options: MountOptions): void;
    addWidget(options: AddWidgetOptions): void;
    updateWidget(options: UpdateWidgetOptions): void;
    removeWidget(containerId: string): void;
    initStyles(theme: SDWThemeObject): void;
    unmount(): void;
}

interface MountOptions {
    clientId: string;
    theme: SDWThemeObject;
    baseUrl?: string | undefined;
    locale?: string;
}

interface AddWidgetOptions {
    containerId: string;
    type: string;
    settings?: SDWThemeObject;
}

interface UpdateWidgetOptions {
    containerId: string;
    type: string;
    settings: {
        calendarTitle: string;
    };
    onTrack: (event: any, data: any) => void;
}

interface SDWThemeObject {
    [key: string]: string | string[] | boolean;
}

interface Window extends Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    $app: import('../app').default;
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    $appState: import('../appState/AppState').AppState;
    $appStateInit: string;
    $data: WindowData;
    $token: string;
    $loginjwt: string;
    $gameId: string;
    $universe: string;
    avvpl: {
        setupPlayer: new (config: AvvplConfig) => Avvpl;
    };
    avvplInstance: Avvpl | null;
    SIR: (actionType: string, selectorId: string | (Element | null), name?: string, params?: any) => void;
    STATSCOREWidgets: STATSCOREWidgets;
    SDW: SDW;
    $hotAppWrapperInst: any;
    $CodeSplittingModules: any;
    $platformId: string;
    $redirect_url: string;
    $add_selectionId_to_betlslip?: string;
    $open_my_bets?: boolean;
    dataLayer: {
        push: (data: Record<string, unknown>) => void;
    };

    setThemeName: (theme: ThemeNames) => void;
    $theme: string;
    $guestCurrency: string;
}
