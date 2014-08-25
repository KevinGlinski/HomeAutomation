package my.home.homeautomation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Helper class for providing sample content for user interfaces created by
 * Android template wizards.
 * <p>
 * TODO: Replace all uses of this class before publishing your app.
 */
public class ActivityContent {

    /**
     * An array of sample (dummy) items.
     */
    public static List<ActivityItem> ITEMS = new ArrayList<ActivityItem>();

    /**
     * A map of sample (dummy) items, by ID.
     */
    public static Map<String, ActivityItem> ITEM_MAP = new HashMap<String, ActivityItem>();

    static {
        // Add 3 sample items.
        addItem(new ActivityItem("1", "Lighting"));
        addItem(new ActivityItem("2", "Scenes"));
        addItem(new ActivityItem("3", "Options"));
    }

    private static void addItem(ActivityItem item) {
        ITEMS.add(item);
        ITEM_MAP.put(item.id, item);
    }

    /**
     * A dummy item representing a piece of content.
     */
    public static class ActivityItem {
        public String id;
        public String content;

        public ActivityItem(String id, String content) {
            this.id = id;
            this.content = content;
        }

        @Override
        public String toString() {
            return content;
        }
    }
}
