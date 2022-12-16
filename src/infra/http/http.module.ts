import { Module } from "@nestjs/common";

import { NotificationsController } from "./controllers/notifications.controller";
import { SendNotification } from "src/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { CancelNotification } from "src/use-cases/cancel-notification";
import { CountRecipientNotification } from "src/use-cases/count-recipient-notification";
import { GetRecipientNotifications } from "src/use-cases/get-recipient-notification";
import { ReadNotification } from "src/use-cases/read-notification";
import { UnreadNotification } from "src/use-cases/unread-notification";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification, CancelNotification, CountRecipientNotification,GetRecipientNotifications,ReadNotification, UnreadNotification],
})
export class HttpModule {}
