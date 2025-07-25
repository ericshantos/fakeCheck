import { InspectorResponse } from "@health/interfaces/response-inspector.interface";
import { PredictorContract } from "@shared/interfaces";
import { Injectable, Inject } from "@nestjs/common";
import { LoggerContract } from "@ericshantos/logger";
import { LOGGER, PREDICTOR } from "@/shared/providers/tokens";

@Injectable()
export class CheckModel {

    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        @Inject(PREDICTOR) private readonly predictor: PredictorContract
    ) {}

    private readonly text: string = "noticia falso espalhar rapidamente rede social poder causar desinformacao larga escala"

    async run(): Promise<InspectorResponse> {
        try {
            const response = await this.predictor.predict(this.text);

            if (!response) {
                const message = "Model did not return a prediction."
                this.logger.error(`[MODEL CHECK] ${message}`);
                return {
                    status: 'error',
                    message: message
                }
            }

            return {
                status: 'success',
                message: 'Model is operational and returning predictions',
            }
        } catch (error) {
            this.logger.error(`[MODEL CHECK] Error while checking model: ${error.message}`);
            return {
                status: 'error',
                message: `Error checking model: ${error.message}`
            }
        }
    }
}