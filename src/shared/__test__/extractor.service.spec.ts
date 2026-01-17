import { Test, TestingModule } from "@nestjs/testing";
import { ObjectValidator, TextExtractor } from "@shared/services";
import { SELECTORS, VALIDATION } from "@shared/providers/tokens";
import { SelectorExtractor } from "@shared/contracts";

describe('TextExtractor', () => {
    let service: TextExtractor;

    let validationMock: jest.Mocked<ObjectValidator>;
    let selectorMock: jest.Mocked<SelectorExtractor>;

    beforeEach(async () => {
        validationMock = {
            validate: jest.fn()
        } as any;

        selectorMock = {
            title: 'h1',
            paragraphs: 'article p'
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TextExtractor,
                { provide: SELECTORS, useValue: selectorMock },
                { provide: VALIDATION, useValue: validationMock },
            ],
        }).compile();

        service = module.get<TextExtractor>(TextExtractor);
    });

    it('must extract title and text from article', () => {
        const html = `
            <html>
            <body>
                <h1>Título de Teste</h1>
                <p>Parágrafo 1</p>
                <p>Parágrafo 2</p>
            </body>
            </html>
        `;

        const result = service.extract(html);

        expect(result.title).toBe('Título de Teste');
        expect(result.articleText).toBe('Parágrafo 1 Parágrafo 2');
    });
});