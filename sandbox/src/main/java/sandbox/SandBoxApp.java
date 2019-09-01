package sandbox;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class SandBoxApp {

    public static void main(String[] args) {

		SandboxAddress address = SandboxAddress.builder().street("480 N McClurg Ct").city("Chicago").state("IL").zipCode("60611").build();

		System.out.println(address.toString());

        String providerTimeZone = "America/Puerto_Rico";
        String dispatchTimeZone = "America/Chicago";

        Clock clock = Clock.systemDefaultZone();
        System.out.println("System clock's timezone " + clock.getZone());
        System.out.println();

        System.out.println("Obtaining LocalDateTime for provider start and end time");
        LocalDateTime providerStartTime = LocalDateTime.of(2019,7,23,8,00);
        LocalDateTime providerEndTime = LocalDateTime.of(2019,7,23,23,00);
        System.out.println("   LocalDateTime provider start_time : " + providerStartTime);
        System.out.println("   LocalDateTime provider end_time   : " +providerEndTime);
        System.out.println();

        //DispatchTime is clock Instant
        System.out.println("Dispatch Time using " + dispatchTimeZone);
        ZonedDateTime clockDispTime = ZonedDateTime.ofInstant(clock.instant(), ZoneId.of(dispatchTimeZone));
        System.out.println("   Clock ZonedDateTime dispatch time at clock Time Zone    : " + clockDispTime.toString());

        ZonedDateTime zonedNowDispatchTimeInProviderTZ = ZonedDateTime.ofInstant(clockDispTime.toInstant(), ZoneId.of(providerTimeZone));
        System.out.println("   Clock ZonedDateTime dispatch time at provider Time Zone : " + zonedNowDispatchTimeInProviderTZ.toString());

        LocalDateTime localNowDispatchTimeAtProvider = zonedNowDispatchTimeInProviderTZ.toLocalDateTime();
        System.out.println("   Clock LocalDateTime dispatch time at provider " + localNowDispatchTimeAtProvider.toString());
        System.out.println("   *** Is Provider Open based on clock instant " + (localNowDispatchTimeAtProvider.isAfter(providerStartTime) && localNowDispatchTimeAtProvider.isBefore(providerEndTime)));
        System.out.println();

        //Scheduled dispatchTime
        System.out.println("Dispatch Time pretending it was scheduled, stil using " + dispatchTimeZone + "...");

        ZonedDateTime schedDispTime = LocalDateTime.parse("2019-07-23 18:51:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")).atZone(ZoneId.of(dispatchTimeZone));
        System.out.println("   Scheduled ZonedDateTime Dispatch Time at dispatch Time Zone : " + schedDispTime.toString());

        ZonedDateTime zonedDispatchTimeInProviderTZ = ZonedDateTime.ofInstant(schedDispTime.toInstant(), ZoneId.of(providerTimeZone));
        System.out.println("   Scheduled ZonedDateTime Dispatch Time at provider Time Zone : " + zonedDispatchTimeInProviderTZ.toString());

        LocalDateTime localSchedDispatchTimeAtProvider = zonedDispatchTimeInProviderTZ.toLocalDateTime();
        System.out.println("   Scheduled LocalDateTime Dispatch Time for provider " + localSchedDispatchTimeAtProvider.toString());

        System.out.println("   *** Is Provider Open Based on scheduled dispatch " + (localSchedDispatchTimeAtProvider.isAfter(providerStartTime) && localSchedDispatchTimeAtProvider.isBefore(providerEndTime)));

    }


}
