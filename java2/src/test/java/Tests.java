import com.fasterxml.jackson.databind.node.ObjectNode;
import junit.framework.TestCase;
import org.gitana.platform.client.node.BaseNode;
import org.gitana.platform.client.node.Node;
import org.gitana.platform.client.support.DriverContext;
import org.gitana.platform.client.support.Response;
import org.gitana.platform.support.QueryBuilder;
import org.gitana.platform.support.ResultMap;
import org.junit.Test;

import java.util.Arrays;
import java.util.Collections;

public class Tests extends TestCase {
    @Test
    public void testGitana() throws Exception {
        TestGitana testGitana = new TestGitana();

        BaseNode readThisNodeAgainLater = testGitana.master.createNode(TestGitana.createNodeObject("hello 1", "n:node", null, "hello world 1"));
        testGitana.master.createNode(TestGitana.createNodeObject("hello 2", "n:node", null, "hello world 2"));

        // property query (using mongodb)
        final ObjectNode nodeTitleQuery = QueryBuilder.start(Node.FIELD_TITLE).is("hello 1").get();
        ResultMap<BaseNode> nodes = testGitana.master.queryNodes(nodeTitleQuery);
        for (BaseNode node : nodes.values()) {
            System.out.println("title query: Node id (._doc): " + node.getId());
        }

        // text search (using elasticsearch)
        nodes = testGitana.master.searchNodes("world");
        for (BaseNode node : nodes.values()) {
            System.out.println("text search: Node id (._doc): " + node.getId());
        }

        // call an API endpoint directly
        Response response = DriverContext.getDriver().getRemote().get("/repositories/" + testGitana.repository.getId() + "/branches/" + testGitana.master.getId() + "/nodes/" + readThisNodeAgainLater.getId());
        BaseNode newNode = DriverContext.getDriver().getFactory().node(testGitana.master, response);
        System.out.println("call API directly to read node. id (._doc): " + newNode.getId() + ", title: " + newNode.getTitle());
    }
}