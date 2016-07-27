import com.fasterxml.jackson.databind.node.ObjectNode;
import org.gitana.platform.client.Gitana;
import org.gitana.platform.client.branch.Branch;
import org.gitana.platform.client.platform.Platform;
import org.gitana.platform.client.repository.Repository;
import org.gitana.platform.support.QueryBuilder;
import org.gitana.util.JsonUtil;

public class TestGitana {
    private static final String REPOSITORY_TITLE = "import test 'content' repository";
    private static final ObjectNode repoQuery = QueryBuilder.start(Repository.FIELD_TITLE).is(REPOSITORY_TITLE).get();
    public final Gitana gitana = new Gitana();
    public Platform platform = gitana.authenticate();
    public Repository repository = platform.queryRepositories(repoQuery).asList().get(0);
    public Branch master = repository.readBranch("master");

    public static ObjectNode createNodeObject(final String title, final String type, final String filePath, final String body) {
        ObjectNode object = JsonUtil.createObject();
        object.put("title", title);
        object.put("_type", type);
        if(null != filePath) {
            object.put("_filePath", filePath);
        }
        object.put("body", body);

        return object;
    }
}